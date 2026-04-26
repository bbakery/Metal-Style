export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <section className="text-center mb-16 relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <img src="/logo.svg" alt="Metal Style Logo" className="mx-auto mb-6 w-48 md:w-56" />
        <h1 className="text-5xl font-bold mb-4 neon-glow">✦ Metal Style ✦</h1>
        <p className="text-cyan-300 mb-4 text-sm uppercase tracking-[0.35em]">artisan metalwork</p>
        <svg className="w-32 h-32 mx-auto mb-6 opacity-60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 Q60 25 70 30 Q60 35 50 40 Q40 35 30 30 Q40 25 50 10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M50 60 Q65 70 75 75 Q65 80 50 85 Q35 80 25 75 Q35 70 50 60" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <p className="text-xl text-cyan-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Онлайн-каталог виробів з металу: металеві лавки, дашки над входом, поручні для перил, декоративні решітки, металеві ворота, ковані двері, балконні огорожі, металеві сходи, ковані світильники, мангали з металу, металеві столи, ковані стільці, декоративні елементи з металу, художня ковка, інтер'єрні та екстер'єрні конструкції.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/catalog" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black px-8 py-3 rounded-lg font-bold shadow-lg shadow-cyan-500/50 transition-all">
            Переглянути каталог
          </a>
          <a href="/contacts" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-black px-8 py-3 rounded-lg font-bold shadow-lg shadow-pink-500/50 transition-all">
            Зв'яжіться з нами
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <article className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-500/30 p-8 rounded-xl hover:border-cyan-400/60 transition-all duration-300">
          <div className="text-4xl mb-3">⬢</div>
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Якість та надійність</h2>
          <p className="text-cyan-200/80">Всі наші вироби виготовлені з високоякісного металу з використанням сучасних технологій ковки.</p>
        </article>
        <article className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md border border-pink-500/30 p-8 rounded-xl hover:border-pink-400/60 transition-all duration-300">
          <div className="text-4xl mb-3">◆</div>
          <h2 className="text-2xl font-bold mb-4 text-pink-300">Індивідуальний підхід</h2>
          <p className="text-pink-200/80">Ми створюємо унікальні металоконструкції відповідно до ваших побажань та потреб.</p>
        </article>
        <article className="bg-gradient-to-br from-lime-500/10 to-emerald-500/10 backdrop-blur-md border border-lime-500/30 p-8 rounded-xl hover:border-lime-400/60 transition-all duration-300">
          <div className="text-4xl mb-3">★</div>
          <h2 className="text-2xl font-bold mb-4 text-lime-300">Швидка доставка</h2>
          <p className="text-lime-200/80">Доставка по Україні через Укрпошту, Нову Пошту та Delivery.</p>
        </article>
      </section>

      <section className="relative bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 backdrop-blur-md border-2 border-cyan-500/40 p-10 rounded-2xl text-center overflow-hidden">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 neon-glow">✨ Актуальна інформація ✨</h2>
          <p className="text-cyan-300 mb-6">Найшвидший зв'язок з нами — через Instagram, Facebook, WhatsApp або Viber. Ми відповідаємо в найкоротший термін!</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <a href="https://www.instagram.com/metal_good_nice/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-lg hover:shadow-pink-500/50 text-black px-4 py-2 rounded-lg font-bold transition-all">
              Instagram
            </a>
            <a href="https://www.facebook.com/GoodNiceCompany" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50 text-black px-4 py-2 rounded-lg font-bold transition-all">
              Facebook
            </a>
            <a href="https://www.tiktok.com/@gordinzar" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-gray-400 to-black hover:shadow-lg hover:shadow-gray-400/50 text-white px-4 py-2 rounded-lg font-bold transition-all">
              TikTok
            </a>
            <a href="https://wa.me/380508829303?text=Я%20хочу%20замовити%20товар" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:shadow-lg hover:shadow-lime-500/50 text-black px-4 py-2 rounded-lg font-bold transition-all">
              WhatsApp
            </a>
            <a href="viber://chat?number=%2B380508829303" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-lg hover:shadow-purple-500/50 text-white px-4 py-2 rounded-lg font-bold transition-all">
              Viber
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
