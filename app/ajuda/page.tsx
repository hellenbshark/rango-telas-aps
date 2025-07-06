export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Central de Ajuda</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Perguntas Frequentes</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-slate-800">Como faço um pedido?</h3>
                <p className="text-slate-600">
                  Faça login como cliente, escolha uma cantina, selecione os itens desejados e finalize o pedido.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-slate-800">Como cadastro minha cantina?</h3>
                <p className="text-slate-600">
                  Clique em "Sou Cantina", faça o cadastro e aguarde a aprovação da nossa equipe.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-slate-800">Como me torno entregador?</h3>
                <p className="text-slate-600">
                  Cadastre-se como entregador, envie sua documentação e comece a fazer entregas.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contato</h2>
            <p className="text-slate-600">Precisa de mais ajuda? Entre em contato conosco:</p>
            <ul className="list-disc list-inside text-slate-600 mt-2">
              <li>Email: suporte@rango.com</li>
              <li>WhatsApp: (11) 99999-9999</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
