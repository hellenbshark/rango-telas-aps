"use client"

import { useState } from "react"
import { User, ShoppingBag, LogOut, MapPin, Clock, DollarSign, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function EntregadorHomePage() {
  const [isOnline, setIsOnline] = useState(false)

  const pedidosDisponiveis = [
    {
      id: 1,
      cantina: "Cantina Central",
      cliente: "João Silva",
      endereco: "Bloco A - Sala 101",
      valor: 25.5,
      distancia: "0.5 km",
      tempo: "15 min",
    },
    {
      id: 2,
      cantina: "Cantina Gourmet",
      cliente: "Maria Santos",
      endereco: "Biblioteca - 2º andar",
      valor: 32.0,
      distancia: "0.8 km",
      tempo: "20 min",
    },
    {
      id: 3,
      cantina: "Cantina Express",
      cliente: "Pedro Costa",
      endereco: "Laboratório de Informática",
      valor: 18.75,
      distancia: "0.3 km",
      tempo: "10 min",
    },
  ]

  const estatisticas = {
    entregasHoje: 8,
    ganhosDia: 156.5,
    tempoOnline: "4h 30min",
    avaliacaoMedia: 4.8,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
      {/* Header */}
      <header className="bg-orange-500 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-white text-2xl font-bold">
              Ran<span className="text-yellow-300">Go</span>
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors">
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </button>
            <Link
              href="/dashboard/entregador/entregas"
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Entregas</span>
            </Link>
            <Link
              href="/dashboard/entregador/cantinas"
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
            >
              <Store className="w-5 h-5" />
              <span>Cantinas</span>
            </Link>
            <button className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Status Toggle */}
        <section className="mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Status de Entrega</h2>
              <div className="flex items-center justify-center space-x-4">
                <span className={`text-lg font-medium ${isOnline ? "text-gray-500" : "text-gray-800"}`}>Offline</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    isOnline ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      isOnline ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`text-lg font-medium ${isOnline ? "text-gray-800" : "text-gray-500"}`}>Online</span>
              </div>
              <p className="text-gray-600 mt-2">
                {isOnline ? "Você está disponível para entregas" : "Ative para receber pedidos"}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Estatísticas */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Estatísticas de Hoje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{estatisticas.entregasHoje}</h3>
                <p className="text-gray-600">Entregas</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">R$ {estatisticas.ganhosDia.toFixed(2)}</h3>
                <p className="text-gray-600">Ganhos</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{estatisticas.tempoOnline}</h3>
                <p className="text-gray-600">Online</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-yellow-500 text-2xl mb-2">⭐</div>
                <h3 className="text-2xl font-bold text-gray-800">{estatisticas.avaliacaoMedia}</h3>
                <p className="text-gray-600">Avaliação</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pedidos Disponíveis */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            {isOnline ? "Pedidos Disponíveis" : "Fique Online para Ver Pedidos"}
          </h2>

          {!isOnline ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500 mb-4">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Você está offline</h3>
                  <p>Ative seu status para começar a receber pedidos de entrega.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pedidosDisponiveis.map((pedido) => (
                <Card key={pedido.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{pedido.cantina}</h3>
                          <span className="text-sm text-gray-500">→ {pedido.cliente}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{pedido.endereco}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>📍 {pedido.distancia}</span>
                          <span>⏱️ {pedido.tempo}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">R$ {pedido.valor.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">Valor do pedido</div>
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-700 whitespace-nowrap">Aceitar Entrega</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
