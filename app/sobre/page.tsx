export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Sobre o RanGo</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-4">
            O RanGo é a plataforma de delivery universitário que conecta estudantes, cantinas e entregadores em um
            ecossistema integrado e eficiente.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Nossa Missão</h2>
          <p className="text-slate-600 mb-4">
            Facilitar o acesso à alimentação de qualidade no ambiente universitário, promovendo praticidade para
            estudantes e oportunidades para cantinas e entregadores.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Como Funciona</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Estudantes fazem pedidos das cantinas do campus</li>
            <li>Cantinas gerenciam cardápios e recebem pedidos</li>
            <li>Entregadores fazem as entregas e ganham dinheiro</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
