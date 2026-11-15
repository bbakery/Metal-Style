// Vercel serverless function: GET /api/products
// Підтягує пости з Facebook-сторінки через Graph API і віддає їх як товари.
// Потрібні змінні середовища у Vercel: FB_PAGE_ID, FB_PAGE_TOKEN
// Необов'язково: CATALOG_HASHTAG (напр. #товар), якщо хочете брати лише пости з цим хештегом.

let TIKTOK_LINKS = [];
try { TIKTOK_LINKS = require("../data/tiktok.json").videos || []; } catch (e) {}

async function tiktokProducts() {
  const out = [];
  for (let i = 0; i < TIKTOK_LINKS.length; i++) {
    const link = TIKTOK_LINKS[i];
    try {
      const r = await fetch("https://www.tiktok.com/oembed?url=" + encodeURIComponent(link));
      if (!r.ok) continue;
      const o = await r.json();
      if (!o.thumbnail_url) continue;
      const text = o.title || "";
      const lines = text.replace(/#\S+/g, "").split(/\n+/).map((l) => l.trim()).filter(Boolean);
      out.push({
        id: "tt_" + i + "_" + link.split("/").pop(),
        name: (lines[0] || "Відео з TikTok").slice(0, 90),
        cat: guessCategory(text),
        avail: "Під замовлення",
        price: findPrice(text),
        desc: lines.slice(1).join("\n").slice(0, 600),
        link,
        linkLabel: "Відео в TikTok",
        photos: [o.thumbnail_url],
        video: true,
        at: Date.now() - i * 1000,
      });
    } catch (e) {}
  }
  return out;
}

const CATEGORY_WORDS = [
  ["Лавки", ["лавк", "лавоч"]],
  ["Дашки над входом", ["дашок", "дашки", "козирок", "навіс"]],
  ["Поручні", ["поручн", "перил"]],
  ["Решітки", ["решітк", "грат"]],
  ["Ворота", ["ворот", "хвіртк", "калітк"]],
  ["Двері", ["двер"]],
  ["Огорожі та балкони", ["огорож", "балкон", "паркан"]],
  ["Сходи", ["сходи", "сходів"]],
  ["Світильники", ["світильник", "ліхтар", "лампа"]],
  ["Мангали", ["мангал", "барбекю", "казан"]],
  ["Столи", ["стіл", "столи"]],
  ["Стільці", ["стілець", "стільці", "крісл"]],
];

function guessCategory(text) {
  const t = text.toLowerCase();
  for (const [cat, words] of CATEGORY_WORDS) {
    if (words.some((w) => t.includes(w))) return cat;
  }
  return "Інше";
}

function findPrice(text) {
  const a = text.match(/(\d[\d\s.,]{2,})\s*(грн|₴|uah)/i);
  if (a) return a[1].replace(/\s+/g, " ").trim() + " грн";
  const b = text.match(/(₴|грн\.?)\s*(\d[\d\s.,]{2,})/i);
  if (b) return b[2].replace(/\s+/g, " ").trim() + " грн";
  return "";
}

module.exports = async (req, res) => {
  const { FB_PAGE_ID, FB_PAGE_TOKEN, CATALOG_HASHTAG } = process.env;
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");

  const tt = await tiktokProducts();

  if (!FB_PAGE_ID || !FB_PAGE_TOKEN) {
    res.status(200).json({ source: tt.length ? "tiktok" : "none", products: tt });
    return;
  }

  const fields = [
    "id",
    "message",
    "created_time",
    "permalink_url",
    "full_picture",
    "attachments{media_type,subattachments{media{image{src}}},media{image{src}}}",
  ].join(",");
  const url =
    "https://graph.facebook.com/v21.0/" +
    encodeURIComponent(FB_PAGE_ID) +
    "/published_posts?limit=50&fields=" +
    encodeURIComponent(fields) +
    "&access_token=" +
    encodeURIComponent(FB_PAGE_TOKEN);

  try {
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok || data.error) {
      res.status(200).json({
        source: "error",
        error: data.error ? data.error.message : "Facebook error " + r.status,
        products: tt,
      });
      return;
    }

    const products = [];
    for (const post of data.data || []) {
      const text = (post.message || "").trim();
      if (CATALOG_HASHTAG && !text.toLowerCase().includes(CATALOG_HASHTAG.toLowerCase())) continue;
      if (/#не_в_каталог/i.test(text)) continue;

      let photos = [];
      const att = post.attachments && post.attachments.data && post.attachments.data[0];
      if (att && att.subattachments && att.subattachments.data) {
        photos = att.subattachments.data
          .map((s) => s.media && s.media.image && s.media.image.src)
          .filter(Boolean);
      }
      if (!photos.length && post.full_picture) photos = [post.full_picture];
      if (!photos.length) continue;

      const clean = text.replace(/#\S+/g, "").trim();
      const lines = clean.split(/\n+/).map((l) => l.trim()).filter(Boolean);
      const name = (lines[0] || "Виріб з металу").slice(0, 90);
      products.push({
        id: "fb_" + post.id,
        name,
        cat: guessCategory(text),
        avail: "Під замовлення",
        price: findPrice(text),
        desc: lines.slice(1).join("\n").slice(0, 600),
        link: post.permalink_url || "",
        linkLabel: "Пост у Facebook",
        photos,
        video: !!(att && /video/i.test(att.media_type || "")),
        at: Date.parse(post.created_time) || 0,
      });
    }

    res.status(200).json({ source: "facebook", products: products.concat(tt) });
  } catch (e) {
    res.status(200).json({ source: "error", error: String(e), products: tt });
  }
};
