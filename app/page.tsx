"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Store, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()

  const userTypes = [
    {
      id: "cliente",
      title: "Sou Cliente",
      description: "Peça comida das cantinas da sua universidade",
      icon: User,
      color: "bg-blue-500 hover:bg-blue-600",
      route: "/login/cliente",
    },
    {
      id: "cantina",
      title: "Sou Cantina",
      description: "Gerencie seu cardápio e pedidos",
      icon: Store,
      color: "bg-green-500 hover:bg-green-600",
      route: "/login/cantina",
    },
    {
      id: "entregador",
      title: "Sou Entregador",
      description: "Faça entregas e ganhe dinheiro",
      icon: Bike,
      color: "bg-orange-500 hover:bg-orange-600",
      route: "/login/entregador",
    },
  ]

  const handleUserTypeSelect = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="text-center py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-2">
            Ran<span className="text-orange-500">Go</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">Delivery Universitário</p>
          <p className="text-sm md:text-base text-slate-500 mt-2">Conectando você às melhores cantinas do campus</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-2">Como você quer usar o RanGo?</h2>
            <p className="text-slate-500">Escolha uma das opções abaixo para começar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {userTypes.map((userType) => {
              const IconComponent = userType.icon
              return (
                <Card
                  key={userType.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-slate-300"
                  onClick={() => handleUserTypeSelect(userType.route)}
                >
                  <CardContent className="p-6 md:p-8 text-center">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full ${userType.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{userType.title}</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">{userType.description}</p>
                    <Button
                      className={`mt-4 w-full ${userType.color} text-white transition-all duration-300`}
                      size="lg"
                    >
                      Continuar
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link
              href="/sobre"
              className="text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm md:text-base"
            >
              Sobre
            </Link>
            <Link
              href="/ajuda"
              className="text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm md:text-base"
            >
              Ajuda
            </Link>
            <Link
              href="/privacidade"
              className="text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm md:text-base"
            >
              Política de Privacidade
            </Link>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-slate-100">
            
          </div>
        </div>
      </footer>
    </div>
  )
}
