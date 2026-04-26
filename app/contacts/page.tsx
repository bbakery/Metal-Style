export default function Contacts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-100">Контакти</h1>
      <div className="max-w-2xl mx-auto space-y-8">
        <section className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Зв'яжіться з нами</h2>
          <p className="text-zinc-300 mb-4">Адреса: м. Косів</p>
          <p className="text-zinc-300 mb-4">Viber / WhatsApp: +380 50 882 93 03</p>
          <p className="text-zinc-300 mb-4">Пишіть приватні повідомлення в Instagram, Facebook або Viber/WhatsApp для швидкого зв'язку з автором.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <a href="https://wa.me/380508829303?text=Я%20хочу%20замовити%20товар" target="_blank" rel="noopener noreferrer" className="block bg-emerald-600 hover:bg-emerald-500 text-white text-center px-4 py-3 rounded">
              WhatsApp
            </a>
            <a href="viber://chat?number=%2B380508829303" className="block bg-violet-700 hover:bg-violet-600 text-white text-center px-4 py-3 rounded">
              Viber
            </a>
            <a href="https://www.instagram.com/metal_good_nice/" target="_blank" rel="noopener noreferrer" className="block bg-pink-600 hover:bg-pink-500 text-white text-center px-4 py-3 rounded">
              Instagram чат
            </a>
            <a href="https://m.me/GoodNiceCompany" target="_blank" rel="noopener noreferrer" className="block bg-blue-600 hover:bg-blue-500 text-white text-center px-4 py-3 rounded">
              Facebook чат
            </a>
          </div>
        </section>
        <section className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Соціальні мережі</h2>
          <ul className="space-y-3 text-zinc-300">
            <li>
              Instagram: <a href="https://www.instagram.com/metal_good_nice/" className="text-zinc-100 hover:text-zinc-300">@metal_good_nice</a>
            </li>
            <li>
              Facebook: <a href="https://www.facebook.com/GoodNiceCompany" className="text-zinc-100 hover:text-zinc-300">GoodNiceCompany</a>
            </li>
            <li>
              TikTok: <a href="https://www.tiktok.com/@gordinzar" className="text-zinc-100 hover:text-zinc-300">@gordinzar</a>
            </li>
          </ul>
          <p className="text-zinc-300 mt-4">На TikTok публікуються актуальні відео виробів у процесі виробництва.</p>
        </section>
        <section className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Наші роботи</h2>
          <p className="text-zinc-300">Кожен виріб створено з думкою про якість, надійність та довговічність. Усі металеві конструкції проходять контроль до остаточної здачі — це гарантія, що ваш товар буде служити довго та виглядати бездоганно.</p>
        </section>

      </div>
    </div>
  );
}