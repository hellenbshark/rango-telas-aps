export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Política de Privacidade</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">Última atualização: Janeiro de 2024</p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Coleta de Dados</h2>
          <p className="text-slate-600 mb-4">Coletamos apenas os dados necessários para o funcionamento do serviço:</p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
            <li>Informações de cadastro (nome, email, telefone)</li>
            <li>Dados de localização para entregas</li>
            <li>Histórico de pedidos</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Uso dos Dados</h2>
          <p className="text-slate-600 mb-4">Seus dados são utilizados exclusivamente para:</p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
            <li>Processar pedidos e entregas</li>
            <li>Comunicação sobre o serviço</li>
            <li>Melhorar a experiência do usuário</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Proteção de Dados</h2>
          <p className="text-slate-600 mb-4">
            Implementamos medidas de segurança para proteger suas informações pessoais e não compartilhamos seus dados
            com terceiros sem seu consentimento.
          </p>
        </div>
      </div>
    </div>
  )
}
