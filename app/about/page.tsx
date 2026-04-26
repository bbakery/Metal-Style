export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-100">Про нас</h1>
      <section className="max-w-4xl mx-auto">
        <article className="bg-zinc-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Історія майстерні Metal Style</h2>
          <p className="text-zinc-300 mb-4">
            Майстерня Metal Style була заснована 21 грудня, 2021 року з метою створення високоякісних металоконструкцій для дому та саду.
            Наші майстри мають багаторічний досвід у художній ковці та обробці металу.
          </p>
          <p className="text-zinc-300 mb-4">
            Ми спеціалізуємося на виробництві металеві лавки, дашки над входом, поручні для перил, декоративні решітки, металеві ворота, ковані двері, балконні огорожі, металеві сходи, ковані світильники, мангали з металу, металеві столи, ковані стільці, декоративні елементи з металу, художня ковка, інтер'єрні та екстер'єрні конструкції.
          </p>
          <p className="text-zinc-300">
            Наша місія - поєднати традиційні техніки ковки з сучасними матеріалами для створення унікальних та функціональних виробів.
          </p>
        </article>
        <article className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Наші цінності</h2>
          <ul className="text-zinc-300 list-disc list-inside">
            <li>Якість матеріалів та виконання</li>
            <li>Індивідуальний підхід до кожного клієнта</li>
            <li>Терміни виконання замовлень</li>
            <li>Доступні ціни</li>
            <li>Гарантія на всі вироби</li>
          </ul>
        </article>
      </section>
    </div>
  );
}