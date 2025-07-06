"use client"

import { useState } from "react"
import { Search, User, ShoppingBag, LogOut, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ClienteHomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const cantinas = [
    { id: 1, nome: "Cantina Central", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 2, nome: "Cantina do Campus", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 3, nome: "Cantina Universitária", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 4, nome: "Cantina da Praça", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 5, nome: "Cantina Express", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 6, nome: "Cantina Gourmet", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 7, nome: "Cantina Saudável", imagem: "/placeholder.svg?height=200&width=300" },
    { id: 8, nome: "Cantina Popular", imagem: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-500 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-white text-2xl font-bold">
              Ran<span className="text-orange-300">Go</span>
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </button>
            <Link
              href="/carrinho"
              className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Carrinho</span>
            </Link>
            <Link
              href="/dashboard/cliente/pedidos"
              className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
            >
              <Clock className="w-5 h-5" />
              <span>Meus Pedidos</span>
            </Link>
            <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="O que sua fome procura hoje?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Cantinas Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Cantinas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cantinas.map((cantina) => (
              <Card
                key={cantina.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                    <img
                      src={cantina.imagem || "/placeholder.svg"}
                      alt={cantina.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-center">{cantina.nome}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
              Ver mais cantinas
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
