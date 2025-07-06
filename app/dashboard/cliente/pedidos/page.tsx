"use client"

import { useState } from "react"
import { User, ShoppingBag, LogOut, ArrowLeft, MapPin, Clock, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

interface Pedido {
  id: number
  numero: string
  cantina: string
  endereco: string
  itens: { nome: string; quantidade: number; preco: number }[]
  total: number
  status: "aceito" | "preparando" | "pronto" | "saindo" | "entregue" | "cancelado" | "recusado"
  horario: string
  tempoEstimado?: string
  entregador?: string
  avaliacao?: number
}

export default function PedidosClientePage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      numero: "14800",
      cantina: "Cantina Central",
      endereco: "Bloco A - Sala 101",
      itens: [
        { nome: "Hambúrguer Artesanal", quantidade: 2, preco: 25.9 },
        { nome: "Batata Frita", quantidade: 1, preco: 12.5 },
        { nome: "Refrigerante", quantidade: 2, preco: 5.0 },
      ],
      total: 67.8,
      status: "preparando",
      horario: "14:30",
      tempoEstimado: "25 min",
    },
    {
      id: 2,
      numero: "14801",
      cantina: "Cantina Gourmet",
      endereco: "Biblioteca - 2º andar",
      itens: [
        { nome: "Sanduíche Natural", quantidade: 1, preco: 18.0 },
        { nome: "Suco Natural", quantidade: 1, preco: 7.0 },
      ],
      total: 25.0,
      status: "pronto",
      horario: "14:35",
      tempoEstimado: "5 min",
    },
    {
      id: 3,
      numero: "14802",
      cantina: "Cantina Express",
      endereco: "Laboratório de Informática",
      itens: [
        { nome: "Coxinha", quantidade: 3, preco: 4.5 },
        { nome: "Refrigerante", quantidade: 1, preco: 5.0 },
      ],
      total: 18.5,
      status: "saindo",
      horario: "14:40",
      tempoEstimado: "10 min",
      entregador: "Carlos Silva",
    },
    {
      id: 4,
      numero: "14803",
      cantina: "Cantina Central",
      endereco: "Cantina Central",
      itens: [
        { nome: "Pizza Individual", quantidade: 1, preco: 28.0 },
        { nome: "Suco", quantidade: 1, preco: 4.0 },
      ],
      total: 32.0,
      status: "entregue",
      horario: "13:15",
      entregador: "Maria Santos",
    },
    {
      id: 5,
      numero: "14804",
      cantina: "Cantina Saudável",
      endereco: "Centro Esportivo",
      itens: [
        { nome: "Salada Caesar", quantidade: 2, preco: 12.0 },
        { nome: "Água", quantidade: 1, preco: 4.0 },
      ],
      total: 28.0,
      status: "entregue",
      horario: "12:20",
      entregador: "João Oliveira",
      avaliacao: 5,
    },
    {
      id: 6,
      numero: "14805",
      cantina: "Cantina Popular",
      endereco: "Refeitório Principal",
      itens: [
        { nome: "Marmitex", quantidade: 1, preco: 15.0 },
        { nome: "Refrigerante", quantidade: 1, preco: 5.0 },
      ],
      total: 20.0,
      status: "cancelado",
      horario: "11:45",
    },
  ])

  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleCancelOrder = (pedido: Pedido) => {
    setSelectedPedido(pedido)
    setShowCancelDialog(true)
  }

  const confirmCancelOrder = () => {
    if (selectedPedido) {
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === selectedPedido.id ? { ...pedido, status: "cancelado" as const } : pedido,
        ),
      )
      setShowCancelDialog(false)
      setSelectedPedido(null)
    }
  }

  const handleRateOrder = (pedido: Pedido) => {
    setSelectedPedido(pedido)
    setRating(pedido.avaliacao || 0)
    setShowRatingDialog(true)
  }

  const submitRating = () => {
    if (selectedPedido && rating > 0) {
      setPedidos(pedidos.map((pedido) => (pedido.id === selectedPedido.id ? { ...pedido, avaliacao: rating } : pedido)))
      setShowRatingDialog(false)
      setSelectedPedido(null)
      setRating(0)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aceito":
        return "bg-blue-100 text-blue-800"
      case "preparando":
        return "bg-yellow-100 text-yellow-800"
      case "pronto":
        return "bg-orange-100 text-orange-800"
      case "saindo":
        return "bg-purple-100 text-purple-800"
      case "entregue":
        return "bg-green-100 text-green-800"
      case "cancelado":
      case "recusado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aceito":
        return "Aceito"
      case "preparando":
        return "Preparando"
      case "pronto":
        return "Pronto"
      case "saindo":
        return "Saindo para entrega"
      case "entregue":
        return "Entregue"
      case "cancelado":
        return "Cancelado"
      case "recusado":
        return "Recusado"
      default:
        return status
    }
  }

  const pedidosEmAndamento = pedidos.filter((p) => ["aceito", "preparando", "pronto", "saindo"].includes(p.status))
  const pedidosEntregues = pedidos.filter((p) => p.status === "entregue")
  const pedidosCancelados = pedidos.filter((p) => ["cancelado", "recusado"].includes(p.status))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-500 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/cliente" className="text-white hover:text-orange-300">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="text-white text-2xl font-bold">
                Ran<span className="text-orange-300">Go</span>
              </div>
            </div>

            <nav className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Perfil</span>
              </button>
              <button className="flex items-center space-x-2 text-orange-300 font-medium">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden md:inline">Meus Pedidos</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Pedidos em Andamento */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos em andamento</h2>
          <div className="space-y-4">
            {pedidosEmAndamento.length === 0 ? (
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                <CardContent className="p-8 text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum pedido em andamento</h3>
                  <p className="text-gray-500">Seus pedidos ativos aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              pedidosEmAndamento.map((pedido) => (
                <Card key={pedido.id} className="bg-white shadow-lg border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-500 text-white px-3 py-2 rounded font-bold text-lg">
                          #{pedido.numero}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-1">{pedido.cantina}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}
                              >
                                {getStatusText(pedido.status)}
                              </span>
                              {pedido.tempoEstimado && (
                                <span className="text-sm text-gray-500">• {pedido.tempoEstimado}</span>
                              )}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{pedido.endereco}</span>
                            </div>
                            {pedido.entregador && (
                              <p className="text-sm text-gray-600">
                                <strong>Entregador:</strong> {pedido.entregador}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600 mb-2">R$ {pedido.total.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">{pedido.horario}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Itens do pedido:</h4>
                          <div className="space-y-1">
                            {pedido.itens.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm text-gray-600">
                                <span>
                                  {item.quantidade}x {item.nome}
                                </span>
                                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {pedido.status === "aceito" && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleCancelOrder(pedido)}
                              variant="destructive"
                              size="sm"
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Cancelar Pedido
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Pedidos Entregues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos entregues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pedidosEntregues.length === 0 ? (
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300 col-span-full">
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum pedido entregue</h3>
                  <p className="text-gray-500">Pedidos concluídos aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              pedidosEntregues.map((pedido) => (
                <Card key={pedido.id} className="bg-white shadow-lg border border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="bg-green-500 text-white px-3 py-2 rounded font-bold inline-block text-lg">
                        #{pedido.numero}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-center">
                        <h4 className="font-bold text-lg text-gray-800">{pedido.cantina}</h4>
                        <p className="text-sm text-gray-600">{pedido.horario}</p>
                        <p className="text-lg font-bold text-green-600">R$ {pedido.total.toFixed(2)}</p>
                      </div>

                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Entregador:</strong> {pedido.entregador}
                        </p>
                        <p>
                          <strong>Endereço:</strong> {pedido.endereco}
                        </p>
                      </div>

                      <div className="pt-4 space-y-2">
                        {pedido.avaliacao ? (
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Sua avaliação:</p>
                            <div className="flex justify-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 ${
                                    star <= pedido.avaliacao! ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleRateOrder(pedido)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Avaliar Pedido
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Pedidos Cancelados */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos cancelados</h2>
          <div className="space-y-3">
            {pedidosCancelados.length === 0 ? (
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                <CardContent className="p-8 text-center">
                  <X className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum pedido cancelado</h3>
                  <p className="text-gray-500">Pedidos cancelados aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              pedidosCancelados.map((pedido) => (
                <Card key={pedido.id} className="bg-white shadow-sm border border-gray-200 opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(pedido.status)}`}>
                          #{pedido.numero}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">
                              {pedido.cantina} - {pedido.horario}
                            </h4>
                            <p className="text-xs text-gray-600">R$ {pedido.total.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-medium text-red-600">{getStatusText(pedido.status)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancelar Pedido</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">Tem certeza que deseja cancelar o pedido #{selectedPedido?.numero}?</p>
            <p className="text-sm text-gray-500">
              Esta ação não pode ser desfeita. O pedido será cancelado e você não será cobrado.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="flex-1">
                Manter Pedido
              </Button>
              <Button onClick={confirmCancelOrder} variant="destructive" className="flex-1">
                Cancelar Pedido
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Avaliar Pedido</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">Como foi sua experiência com este pedido?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowRatingDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={submitRating} disabled={rating === 0} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Enviar Avaliação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
