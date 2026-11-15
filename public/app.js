(function () {
  "use strict";
  var PHONE = "380508829303", PHONE_FMT = "+38 050 882 93 03";
  var L = {
    ig: "https://www.instagram.com/metal_good_nice/",
    fb: "https://www.facebook.com/GoodNiceCompany",
    tt: "https://www.tiktok.com/@gordinzar",
    wa: "https://wa.me/" + PHONE,
    vb: "viber://chat?number=%2B" + PHONE
  };
  var CATS = ["Лавки", "Дашки над входом", "Поручні", "Решітки", "Ворота", "Двері", "Огорожі та балкони", "Сходи", "Світильники", "Мангали", "Столи", "Стільці", "Декор і ковка", "Інше"];
  var state = { products: [], filter: "all", loaded: false };
  var viewId = null, shot = 0;
  var $ = function (i) { return document.getElementById(i); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) { u = (u || "").trim(); return /^https?:\/\//i.test(u) ? u : ""; }
  function img(u) { u = String(u || ""); return /^(https?:)?\/\//i.test(u) || u.charAt(0) === "/" || /^data:image\//i.test(u) ? u : ""; }
  function toast(t) {
    var el = $("toast"); el.textContent = t; el.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.hidden = true; }, 2600);
  }
  function priceText(p) { return p.price && p.price.trim() ? p.price.trim() : "Ціна договірна"; }
  function waLink(p) { return L.wa + "?text=" + encodeURIComponent("Доброго дня! Цікавить: " + p.name); }

  function cardHtml(p) {
    var first = p.photos && p.photos[0] ? img(p.photos[0]) : "";
    var im = first ? '<img loading="lazy" alt="' + esc(p.name) + '" src="' + esc(first) + '">' : esc((p.name || "?").charAt(0).toUpperCase());
    var neg = !(p.price && p.price.trim());
    return '<article class="card" role="button" tabindex="0" data-act="open" data-id="' + esc(p.id) + '"><div class="ph">' + im + '</div><div class="cb"><span class="tag">' + esc(p.cat) + '</span><h3>' + esc(p.name) + '</h3><div class="meta"><span class="price' + (neg ? " neg" : "") + '">' + esc(priceText(p)) + '</span><span class="badge">' + esc(p.avail || "Під замовлення") + '</span></div></div></article>';
  }

  function render() {
    var ps = state.products.filter(function (p) { return state.filter === "all" || p.cat === state.filter; });
    var used = [];
    state.products.forEach(function (p) { if (used.indexOf(p.cat) < 0) used.push(p.cat); });
    var h = '<div class="wrap"><header class="top"><div class="brand">Metal Style<small>ковані та металеві вироби</small></div><nav class="soc" aria-label="Соцмережі"><a class="chip" href="' + L.ig + '" target="_blank" rel="noopener">Instagram</a><a class="chip" href="' + L.fb + '" target="_blank" rel="noopener">Facebook</a><a class="chip" href="' + L.tt + '" target="_blank" rel="noopener">TikTok</a></nav></header><div class="rivets" aria-hidden="true"></div>';
    h += '<section class="hero"><h1>Метал, який виготовляють під вас</h1><p>Лавки, дашки, поручні, ворота, огорожі, світильники, мангали та інші вироби художньої ковки. Кожну річ робимо під замовлення, ціну узгоджуємо після уточнення розмірів.</p><div class="cta"><a class="btn" href="' + L.wa + '?text=' + encodeURIComponent("Доброго дня! Хочу замовити виріб з металу") + '" target="_blank" rel="noopener">Написати у WhatsApp</a><a class="btn ghost" href="' + L.ig + '" target="_blank" rel="noopener">Дивитись Instagram</a></div></section>';
    h += '<section class="sec" id="catalog"><h2>Каталог</h2>';
    if (state.products.length) {
      h += '<div class="filters"><button class="chip" data-act="filter" data-v="all" aria-pressed="' + (state.filter === "all") + '">Усі</button>';
      CATS.filter(function (c) { return used.indexOf(c) >= 0; }).forEach(function (c) {
        h += '<button class="chip" data-act="filter" data-v="' + esc(c) + '" aria-pressed="' + (state.filter === c) + '">' + esc(c) + '</button>';
      });
      h += '</div><div class="grid">' + ps.map(cardHtml).join("") + '</div>';
    } else {
      h += '<div class="empty"><p>' + (state.loaded ? "Товари скоро з’являться тут. Напишіть нам, що потрібно, і ми виготовимо це під замовлення." : "Завантажуємо каталог…") + '</p></div>';
    }
    h += '</section><div class="rivets" aria-hidden="true"></div><section class="sec" id="genwrap"></section><div class="rivets" aria-hidden="true"></div><section class="sec"><h2>Як замовити</h2><ol class="steps"><li><b>Напишіть нам</b><span>У WhatsApp, Viber або в Direct в Instagram. Можна надіслати фото чи ескіз.</span></li><li><b>Узгодимо деталі</b><span>Розміри, матеріал, колір і ціну. Вона договірна або вказана в коментарі під постом.</span></li><li><b>Виготовлення і доставка</b><span>Відправляємо по Україні Укрпоштою, Новою Поштою або Delivery.</span></li></ol></section>';
    h += '<footer class="foot"><div class="cta"><a class="btn" href="' + L.wa + '" target="_blank" rel="noopener">WhatsApp</a><a class="btn ghost" href="' + L.vb + '">Viber</a></div><div>Телефон: <span class="phone">' + PHONE_FMT + '</span></div><div>© 2026 Metal Style</div></footer></div>';
    $("app").innerHTML = h;
    renderGen();
  }


  /* ---------- Генератор ескізу ---------- */
  var TYPE_EN = {"Лавки":"garden bench","Дашки над входом":"entrance door canopy","Поручні":"stair handrail","Решітки":"decorative window grille","Ворота":"driveway gate","Двері":"entrance door","Огорожі та балкони":"balcony railing","Сходи":"metal staircase","Світильники":"hanging lantern","Мангали":"BBQ grill","Столи":"table","Стільці":"chair","Декор і ковка":"decorative wall piece","Інше":"custom piece"};
  var STYLES = {"Класична ковка":"classic hand-forged wrought iron with scrolls","Лофт":"industrial loft style, raw steel and profile tube","Мінімалізм":"minimalist modern style, clean lines, black powder coat","Орнамент":"ornate decorative style with floral ornaments"};
  var gen = { type: "Лавки", style: "Класична ковка", size: "", note: "", seed: 1, url: "", state: "idle" };

  function genPrompt() {
    var t = TYPE_EN[gen.type] || "custom piece";
    var p = "Concept design render of a custom metal " + t + ", " + STYLES[gen.style] + ", handmade by a metalworker";
    if (gen.size.trim()) p += ", dimensions " + gen.size.trim();
    if (gen.note.trim()) p += ", customer wishes: " + gen.note.trim();
    return p + ", realistic product photo, clean light background, 3/4 view, high detail";
  }
  function genUrl() {
    return "https://image.pollinations.ai/prompt/" + encodeURIComponent(genPrompt()) + "?width=1024&height=768&nologo=true&seed=" + gen.seed;
  }
  function genWa() {
    var m = "Доброго дня! Хочу замовити виріб за своїм ескізом.\nТип: " + gen.type + "\nСтиль: " + gen.style +
      (gen.size.trim() ? "\nРозмір: " + gen.size.trim() : "") + (gen.note.trim() ? "\nПобажання: " + gen.note.trim() : "") +
      (gen.url ? "\nЕскіз: " + gen.url : "");
    return L.wa + "?text=" + encodeURIComponent(m);
  }
  function opts(map, cur) {
    return (Array.isArray(map) ? map : Object.keys(map)).map(function (k) { return '<option' + (k === cur ? " selected" : "") + '>' + esc(k) + '</option>'; }).join("");
  }
  function renderGen() {
    var host = $("genwrap"); if (!host) return;
    var res = "";
    if (gen.state === "error") res = '<div class="gres"><div class="gph">Не вдалося згенерувати ескіз. Спробуйте ще раз або відкрийте промпт у ChatGPT.</div></div>';
    else if (gen.url) res = '<div class="gres"><img alt="Ескіз виробу" src="' + esc(gen.url) + '"><p class="gnote">Це ілюстрація від ШІ, а не креслення. Остаточний вигляд і розміри узгодимо з вами.</p></div>';
    host.innerHTML = '<h2>Придумайте свій виріб</h2><p class="glead">Опишіть, що потрібно, і ШІ намалює ескіз. Його можна одразу надіслати нам, і ми виготовимо щось подібне.</p><div class="gform"><div class="fld"><label for="g-type">Що виготовити</label><select id="g-type">' + opts(CATS, gen.type) + '</select></div><div class="fld"><label for="g-style">Стиль</label><select id="g-style">' + opts(STYLES, gen.style) + '</select></div><div class="fld"><label for="g-size">Розмір (необов’язково)</label><input id="g-size" value="' + esc(gen.size) + '" maxlength="80" placeholder="Напр. 1500 × 500 мм"></div><div class="fld" style="grid-column:1/-1"><label for="g-note">Побажання</label><textarea id="g-note" maxlength="300" placeholder="Колір, матеріал, деталі, де буде стояти">' + esc(gen.note) + '</textarea></div></div><div class="cta" style="margin-top:14px"><button class="btn" data-act="gen">' + (gen.url ? "Інший варіант" : "Згенерувати ескіз") + '</button><a class="btn ghost" data-act="gpt" href="https://chatgpt.com/?q=' + encodeURIComponent("Створи зображення: " + genPrompt()) + '" target="_blank" rel="noopener">Відкрити в ChatGPT</a><button class="btn ghost" data-act="gcopy">Скопіювати промпт</button></div>' + res + (gen.url ? '<div class="cta" style="margin-top:14px"><a class="btn" href="' + genWa() + '" target="_blank" rel="noopener">Надіслати ескіз у WhatsApp</a></div>' : "");
    var im = host.querySelector(".gres img");
    if (im) {
      gen.state = "loading"; var wrap = im.parentNode; im.style.display = "none";
      var ph = document.createElement("div"); ph.className = "gph"; ph.textContent = "Малюємо ескіз… це може зайняти до хвилини"; wrap.insertBefore(ph, im);
      im.onload = function () { gen.state = "ready"; ph.remove(); im.style.display = ""; };
      im.onerror = function () { gen.state = "error"; gen.url = ""; renderGen(); };
    }
  }
  document.addEventListener("input", function (ev) {
    var id = ev.target && ev.target.id;
    if (id === "g-type") gen.type = ev.target.value;
    else if (id === "g-style") gen.style = ev.target.value;
    else if (id === "g-size") gen.size = ev.target.value;
    else if (id === "g-note") gen.note = ev.target.value;
    var g = document.querySelector('[data-act="gpt"]'); if (g && id && id.indexOf("g-") === 0) g.href = "https://chatgpt.com/?q=" + encodeURIComponent("Створи зображення: " + genPrompt());
  });

  function closeModal() { $("modal").innerHTML = ""; viewId = null; shot = 0; document.body.style.overflow = ""; }
  function showProduct(id) {
    var p = state.products.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    viewId = id;
    var ph = (p.photos || []).map(img).filter(Boolean);
    shot = Math.min(shot, Math.max(0, ph.length - 1));
    var main = ph.length ? '<img alt="' + esc(p.name) + '" src="' + esc(ph[shot]) + '">' : esc(p.name.charAt(0).toUpperCase());
    var th = ph.length > 1 ? '<div class="thumbs">' + ph.map(function (x, i) {
      return '<button data-act="shot" data-i="' + i + '" aria-label="Фото ' + (i + 1) + '" aria-current="' + (i === shot) + '"><img alt="" src="' + esc(x) + '"></button>';
    }).join("") + '</div>' : "";
    var link = safeUrl(p.link);
    var idea = p.avail === "Ідея";
    var inner = '<div class="pd"><div><div class="main">' + main + '</div>' + th + '</div><div class="info"><span class="tag">' + esc(p.cat) + ' · ' + esc(p.avail || "Під замовлення") + '</span><h2>' + esc(p.name) + '</h2><div class="price' + ((p.price && p.price.trim()) ? "" : " neg") + '" style="font-size:20px">' + esc(priceText(p)) + '</div>' + (p.desc ? '<p class="desc">' + esc(p.desc) + '</p>' : "") + '<div class="acts"><a class="btn" href="' + waLink(p) + '" target="_blank" rel="noopener">' + (idea ? "Обговорити у WhatsApp" : "Замовити у WhatsApp") + '</a><a class="btn ghost" href="' + L.vb + '">Написати у Viber</a>' + (link ? '<a class="btn ghost" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || "Оригінальний пост") + '</a>' : "") + '</div><div>Телефон: <span class="phone">' + PHONE_FMT + '</span> <button class="chip" data-act="copy" style="min-height:30px;padding:2px 10px">Копіювати</button></div></div></div>';
    document.body.style.overflow = "hidden";
    $("modal").innerHTML = '<div class="ov" data-act="bg"><div class="dlg" role="dialog" aria-modal="true" aria-label="Виріб"><div class="dlg-h"><b>Виріб</b><button class="btn ghost" data-act="close" style="min-height:36px;padding:4px 14px">Закрити</button></div><div class="dlg-b">' + inner + '</div></div></div>';
  }
  function copyPhone() {
    try { navigator.clipboard.writeText(PHONE_FMT).then(function () { toast("Номер скопійовано"); }, function () { toast(PHONE_FMT); }); }
    catch (e) { toast(PHONE_FMT); }
  }

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-act]");
    if (!t) return;
    var a = t.getAttribute("data-act");
    if (a === "bg") { if (ev.target === t) closeModal(); return; }
    if (a === "close") closeModal();
    else if (a === "open") { shot = 0; showProduct(t.getAttribute("data-id")); }
    else if (a === "filter") { state.filter = t.getAttribute("data-v"); render(); }
    else if (a === "shot") { shot = +t.getAttribute("data-i"); showProduct(viewId); }
    else if (a === "copy") copyPhone();
    else if (a === "gen") { gen.seed = Math.floor(Math.random() * 1e6); gen.url = genUrl(); gen.state = "loading"; renderGen(); }
    else if (a === "gcopy") { try { navigator.clipboard.writeText(genPrompt()).then(function () { toast("Промпт скопійовано"); }, function () { toast("Не вдалося скопіювати"); }); } catch (e) { toast("Не вдалося скопіювати"); } }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && $("modal").firstChild) closeModal();
    var el = ev.target;
    if ((ev.key === "Enter" || ev.key === " ") && el.getAttribute && el.getAttribute("data-act") === "open") {
      ev.preventDefault(); shot = 0; showProduct(el.getAttribute("data-id"));
    }
  });

  function getJson(url) {
    return fetch(url).then(function (r) { return r.ok ? r.json() : { products: [] }; }).catch(function () { return { products: [] }; });
  }
  render();
  Promise.all([getJson("/api/products"), getJson("/products.json")]).then(function (res) {
    var fb = (res[0] && res[0].products) || [], manual = (res[1] && res[1].products) || [];
    state.products = fb.concat(manual).sort(function (a, b) { return (b.at || 0) - (a.at || 0); });
    state.loaded = true;
    render();
  });
})();
