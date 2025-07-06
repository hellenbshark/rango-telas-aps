"use client"

import { useState } from "react"
import { User, Menu, ShoppingBag, LogOut, Bike, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Pedido {
  id: number
  numero: string
  cliente: string
  itens: string[]
  total: number
  endereco: string
  telefone: string
  status: "pendente" | "aceito" | "preparando" | "pronto" | "entregue" | "recusado"
  horario: string
}

export default function PedidosCantinaPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      numero: "14800",
      cliente: "João Silva",
      itens: ["2x Hambúrguer Artesanal", "1x Batata Frita", "2x Refrigerante"],
      total: 67.8,
      endereco: "Bloco A - Sala 101",
      telefone: "(11) 99999-9999",
      status: "pendente",
      horario: "14:30",
    },
    {
      id: 2,
      numero: "14801",
      cliente: "Maria Santos",
      itens: ["1x Sanduíche Natural", "1x Suco Natural"],
      total: 25.0,
      endereco: "Biblioteca - 2º andar",
      telefone: "(11) 88888-8888",
      status: "pendente",
      horario: "14:35",
    },
    {
      id: 3,
      numero: "14802",
      cliente: "Pedro Costa",
      itens: ["3x Coxinha", "1x Refrigerante"],
      total: 18.5,
      endereco: "Laboratório de Informática",
      telefone: "(11) 77777-7777",
      status: "pendente",
      horario: "14:40",
    },
    {
      id: 4,
      numero: "14803",
      cliente: "Ana Oliveira",
      itens: ["1x Pizza Individual", "1x Suco"],
      total: 32.0,
      endereco: "Cantina Central",
      telefone: "(11) 66666-6666",
      status: "aceito",
      horario: "14:15",
    },
    {
      id: 5,
      numero: "14804",
      cliente: "Carlos Lima",
      itens: ["2x Pão de Açúcar", "1x Café"],
      total: 12.0,
      endereco: "Secretaria",
      telefone: "(11) 55555-5555",
      status: "preparando",
      horario: "14:20",
    },
    {
      id: 6,
      numero: "14805",
      cliente: "Lucia Ferreira",
      itens: ["1x Salada Caesar", "1x Água"],
      total: 22.5,
      endereco: "Sala dos Professores",
      telefone: "(11) 44444-4444",
      status: "pronto",
      horario: "14:10",
    },
  ])

  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleAcceptOrder = (pedidoId: number) => {
    setPedidos(pedidos.map((pedido) => (pedido.id === pedidoId ? { ...pedido, status: "aceito" as const } : pedido)))
    setSuccessMessage("Pedido aceito com sucesso!")
    setShowSuccessDialog(true)
  }

  const handleRejectOrder = (pedido: Pedido) => {
    setSelectedPedido(pedido)
    setShowRejectDialog(true)
  }

  const confirmRejectOrder = () => {
    if (selectedPedido && rejectReason.trim()) {
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === selectedPedido.id ? { ...pedido, status: "recusado" as const } : pedido,
        ),
      )
      setShowRejectDialog(false)
      setRejectReason("")
      setSuccessMessage("Pedido recusado!")
      setShowSuccessDialog(true)
    }
  }

  const handleStatusUpdate = (pedidoId: number, newStatus: string) => {
    setPedidos(
      pedidos.map((pedido) => (pedido.id === pedidoId ? { ...pedido, status: newStatus as Pedido["status"] } : pedido)),
    )
    setSuccessMessage("Status atualizado com sucesso!")
    setShowSuccessDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-blue-500"
      case "aceito":
      case "preparando":
        return "bg-yellow-500"
      case "pronto":
        return "bg-orange-500"
      case "entregue":
        return "bg-green-500"
      case "recusado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "aceito":
        return "Aceito"
      case "preparando":
        return "Preparando"
      case "pronto":
        return "Pronto"
      case "entregue":
        return "Entregue"
      case "recusado":
        return "Recusado"
      default:
        return status
    }
  }

  const pedidosPendentes = pedidos.filter((p) => p.status === "pendente")
  const pedidosEmAndamento = pedidos.filter((p) => ["aceito", "preparando", "pronto"].includes(p.status))
  const pedidosConcluidos = pedidos.filter((p) => ["entregue", "recusado"].includes(p.status))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-500 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/cantina" className="text-white hover:text-orange-300">
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
              <Link
                href="/dashboard/cantina"
                className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden md:inline">Cardápio</span>
              </Link>
              <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
                <Bike className="w-5 h-5" />
                <span className="hidden md:inline">Entregadores</span>
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
        {/* Pedidos Pendentes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos pendentes</h2>
          <div className="space-y-4">
            {pedidosPendentes.length === 0 ? (
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum pedido pendente</h3>
                  <p className="text-gray-500">Novos pedidos aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              pedidosPendentes.map((pedido) => (
                <Card key={pedido.id} className="shadow-sm border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`${getStatusColor(pedido.status)} text-white px-3 py-1 rounded font-bold text-sm`}
                        >
                          #{pedido.numero}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="mb-3">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {pedido.cliente} - {pedido.horario}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{pedido.endereco}</p>
                          <div className="text-sm text-gray-600">
                            <p className="mb-1">
                              <strong>Itens:</strong> {pedido.itens.join(", ")}
                            </p>
                            <p>
                              <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAcceptOrder(pedido.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Aceitar
                        </Button>
                        <Button
                          onClick={() => handleRejectOrder(pedido)}
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Recusar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Pedidos em Andamento */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos em andamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidosEmAndamento.length === 0 ? (
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300 col-span-full">
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum pedido em andamento</h3>
                  <p className="text-gray-500">Pedidos aceitos aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              pedidosEmAndamento.map((pedido) => (
                <Card key={pedido.id} className="shadow-sm border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div
                        className={`${getStatusColor(pedido.status)} text-white px-3 py-2 rounded font-bold inline-block`}
                      >
                        #{pedido.numero}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">{pedido.cliente}</h4>
                      <p className="text-xs text-gray-600 mb-2">{pedido.endereco}</p>
                      <p className="text-xs text-gray-600">
                        <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Informe o status do pedido:
                        </label>
                        <Select value={pedido.status} onValueChange={(value) => handleStatusUpdate(pedido.id, value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aceito">Aceito</SelectItem>
                            <SelectItem value="preparando">Preparando</SelectItem>
                            <SelectItem value="pronto">Pronto para entrega</SelectItem>
                            <SelectItem value="entregue">Entregue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Pedidos Concluídos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos concluídos</h2>
          <div className="space-y-3">
            {pedidosConcluidos.length === 0 ? (
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                <CardContent className="p-8 text-center">
                  <Check className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum pedido concluído</h3>
                  <p className="text-gray-500">Pedidos finalizados aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              pedidosConcluidos.map((pedido) => (
                <Card key={pedido.id} className="shadow-sm border border-gray-200 opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`${getStatusColor(pedido.status)} text-white px-2 py-1 rounded text-sm font-medium`}
                        >
                          #{pedido.numero}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">
                              {pedido.cliente} - {pedido.horario}
                            </h4>
                            <p className="text-xs text-gray-600">R$ {pedido.total.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs font-medium ${
                                pedido.status === "entregue" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {getStatusText(pedido.status)}
                            </span>
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

      {/* Reject Order Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Cancelamento do pedido
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Informe o motivo ao cliente:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Escreva o motivo..."
              rows={4}
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={confirmRejectOrder} className="flex-1 bg-red-600 hover:bg-red-700">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pedido atualizado!</h3>
            <p className="text-gray-600 mb-4">{successMessage}</p>
            <Button onClick={() => setShowSuccessDialog(false)} className="bg-green-600 hover:bg-green-700">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
