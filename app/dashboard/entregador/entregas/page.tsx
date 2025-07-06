"use client"

import { useState } from "react"
import { User, LogOut, ArrowLeft, MapPin, Clock, Phone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

interface Entrega {
  id: number
  numero: string
  cantina: string
  cliente: string
  endereco: string
  telefone: string
  itens: string[]
  valor: number
  distancia: string
  tempoEstimado: string
  status: "pendente" | "aceita" | "coletada" | "entregue" | "recusada"
  horario: string
}

export default function EntregasEntregadorPage() {
  const [entregas, setEntregas] = useState<Entrega[]>([
    {
      id: 1,
      numero: "14800",
      cantina: "Cantina Central",
      cliente: "João Silva",
      endereco: "Bloco A - Sala 101",
      telefone: "(11) 99999-9999",
      itens: ["2x Hambúrguer Artesanal", "1x Batata Frita", "2x Refrigerante"],
      valor: 67.8,
      distancia: "0.5 km",
      tempoEstimado: "15 min",
      status: "pendente",
      horario: "14:30",
    },
    {
      id: 2,
      numero: "14801",
      cantina: "Cantina Gourmet",
      cliente: "Maria Santos",
      endereco: "Biblioteca - 2º andar",
      telefone: "(11) 88888-8888",
      itens: ["1x Sanduíche Natural", "1x Suco Natural"],
      valor: 25.0,
      distancia: "0.8 km",
      tempoEstimado: "20 min",
      status: "pendente",
      horario: "14:35",
    },
    {
      id: 3,
      numero: "14802",
      cantina: "Cantina Express",
      cliente: "Pedro Costa",
      endereco: "Laboratório de Informática",
      telefone: "(11) 77777-7777",
      itens: ["3x Coxinha", "1x Refrigerante"],
      valor: 18.5,
      distancia: "0.3 km",
      tempoEstimado: "10 min",
      status: "pendente",
      horario: "14:40",
    },
    {
      id: 4,
      numero: "14803",
      cantina: "Cantina Central",
      cliente: "Ana Oliveira",
      endereco: "Cantina Central",
      telefone: "(11) 66666-6666",
      itens: ["1x Pizza Individual", "1x Suco"],
      valor: 32.0,
      distancia: "0.2 km",
      tempoEstimado: "8 min",
      status: "aceita",
      horario: "14:15",
    },
    {
      id: 5,
      numero: "14804",
      cantina: "Cantina Saudável",
      cliente: "Carlos Lima",
      endereco: "Centro Esportivo",
      telefone: "(11) 55555-5555",
      itens: ["2x Salada Caesar", "1x Água"],
      valor: 28.0,
      distancia: "1.2 km",
      tempoEstimado: "25 min",
      status: "coletada",
      horario: "14:20",
    },
  ])

  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [selectedEntrega, setSelectedEntrega] = useState<Entrega | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleAcceptOrder = (entregaId: number) => {
    setEntregas(
      entregas.map((entrega) => (entrega.id === entregaId ? { ...entrega, status: "aceita" as const } : entrega)),
    )
    setSuccessMessage("Entrega aceita com sucesso!")
    setShowSuccessDialog(true)
  }

  const handleRejectOrder = (entrega: Entrega) => {
    setSelectedEntrega(entrega)
    setShowRejectDialog(true)
  }

  const confirmRejectOrder = () => {
    if (selectedEntrega && rejectReason.trim()) {
      setEntregas(
        entregas.map((entrega) =>
          entrega.id === selectedEntrega.id ? { ...entrega, status: "recusada" as const } : entrega,
        ),
      )
      setShowRejectDialog(false)
      setRejectReason("")
      setSuccessMessage("Entrega recusada!")
      setShowSuccessDialog(true)
    }
  }

  const handleConfirmDelivery = (entrega: Entrega) => {
    setSelectedEntrega(entrega)
    setShowConfirmDialog(true)
  }

  const confirmDelivery = () => {
    if (selectedEntrega) {
      setEntregas(
        entregas.map((entrega) =>
          entrega.id === selectedEntrega.id ? { ...entrega, status: "entregue" as const } : entrega,
        ),
      )
      setShowConfirmDialog(false)
      setSuccessMessage("Entrega confirmada com sucesso!")
      setShowSuccessDialog(true)
    }
  }

  const handleCollectOrder = (entregaId: number) => {
    setEntregas(
      entregas.map((entrega) => (entrega.id === entregaId ? { ...entrega, status: "coletada" as const } : entrega)),
    )
    setSuccessMessage("Pedido coletado! Dirija-se ao local de entrega.")
    setShowSuccessDialog(true)
  }

  const entregasPendentes = entregas.filter((e) => e.status === "pendente")
  const entregasEmAndamento = entregas.filter((e) => ["aceita", "coletada"].includes(e.status))
  const entregasConcluidas = entregas.filter((e) => ["entregue", "recusada"].includes(e.status))

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
      {/* Header */}
      <header className="bg-orange-500 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/entregador" className="text-white hover:text-yellow-300">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="text-white text-2xl font-bold">
                Ran<span className="text-yellow-300">Go</span>
              </div>
            </div>

            <nav className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Perfil</span>
              </button>
              <button className="flex items-center space-x-2 text-yellow-300 font-medium">
                <Check className="w-5 h-5" />
                <span className="hidden md:inline">Meus Pedidos</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Entregas Pendentes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Entregas pendentes</h2>
          <div className="space-y-4">
            {entregasPendentes.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma entrega pendente</h3>
                  <p className="text-gray-500">Novas entregas aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              entregasPendentes.map((entrega) => (
                <Card key={entrega.id} className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-orange-500 text-white px-3 py-2 rounded font-bold text-lg">
                          #{entrega.numero}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="font-bold text-lg mb-2 text-gray-800">
                            {entrega.cantina} → {entrega.cliente}
                          </h3>
                          <div className="space-y-1 text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{entrega.endereco}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{entrega.telefone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span>📍 {entrega.distancia}</span>
                              <span>⏱️ {entrega.tempoEstimado}</span>
                              <span>💰 R$ {entrega.valor.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">
                              <strong>Itens:</strong> {entrega.itens.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAcceptOrder(entrega.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Aceitar
                        </Button>
                        <Button
                          onClick={() => handleRejectOrder(entrega)}
                          className="bg-red-600 hover:bg-red-700 text-white"
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

        {/* Entregas em Andamento */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Entregas em andamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entregasEmAndamento.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm col-span-full">
                <CardContent className="p-8 text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma entrega em andamento</h3>
                  <p className="text-gray-500">Aceite entregas para vê-las aqui</p>
                </CardContent>
              </Card>
            ) : (
              entregasEmAndamento.map((entrega) => (
                <Card key={entrega.id} className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="bg-orange-500 text-white px-3 py-2 rounded font-bold inline-block text-lg">
                        #{entrega.numero}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{entrega.cliente}</h4>
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {entrega.endereco}
                        </p>
                      </div>

                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Cantina:</strong> {entrega.cantina}
                        </p>
                        <p>
                          <strong>Telefone:</strong> {entrega.telefone}
                        </p>
                        <p>
                          <strong>Valor:</strong> R$ {entrega.valor.toFixed(2)}
                        </p>
                        <p>
                          <strong>Distância:</strong> {entrega.distancia}
                        </p>
                      </div>

                      <div className="space-y-2 pt-4">
                        {entrega.status === "aceita" ? (
                          <Button
                            onClick={() => handleCollectOrder(entrega.id)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            Confirmar Coleta
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleConfirmDelivery(entrega)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            Confirmar Entrega
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Entregas Concluídas */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Entregas concluídas (hoje)</h2>
          <div className="space-y-3">
            {entregasConcluidas.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Check className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma entrega concluída</h3>
                  <p className="text-gray-500">Entregas finalizadas aparecerão aqui</p>
                </CardContent>
              </Card>
            ) : (
              entregasConcluidas.map((entrega) => (
                <Card key={entrega.id} className="bg-white/90 backdrop-blur-sm opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            entrega.status === "entregue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          #{entrega.numero}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">
                              {entrega.cliente} - {entrega.horario}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {entrega.cantina} • R$ {entrega.valor.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs font-medium ${
                                entrega.status === "entregue" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {entrega.status === "entregue" ? "Entregue" : "Recusada"}
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
              Cancelamento da entrega
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Informe o motivo à cantina:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
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

      {/* Confirm Delivery Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Entrega</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Confirma que entregou o pedido #{selectedEntrega?.numero} para {selectedEntrega?.cliente}?
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-1">
                Não
              </Button>
              <Button onClick={confirmDelivery} className="flex-1 bg-green-600 hover:bg-green-700">
                Sim
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sucesso!</h3>
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
