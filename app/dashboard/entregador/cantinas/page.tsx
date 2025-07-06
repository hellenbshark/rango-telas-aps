"use client"

import { useState } from "react"
import { User, ShoppingBag, LogOut, Store, ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface Cantina {
  id: number
  nome: string
  endereco: string
  telefone: string
  emExpediente: boolean
  vinculadoDesde: string
  avatar?: string
  avaliacaoMedia: number
  totalPedidos: number
  horarioFuncionamento: string
}

export default function CantinasEntregadorPage() {
  const [cantinas, setCantinas] = useState<Cantina[]>([
    {
      id: 1,
      nome: "Cantina Central",
      endereco: "Bloco A - Campus Principal",
      telefone: "(11) 99999-9999",
      emExpediente: true,
      vinculadoDesde: "15/01/2024",
      avaliacaoMedia: 4.8,
      totalPedidos: 156,
      horarioFuncionamento: "07:00 - 18:00",
    },
    {
      id: 2,
      nome: "Cantina Gourmet",
      endereco: "Biblioteca - 2º andar",
      telefone: "(11) 88888-8888",
      emExpediente: true,
      vinculadoDesde: "22/01/2024",
      avaliacaoMedia: 4.9,
      totalPedidos: 203,
      horarioFuncionamento: "08:00 - 17:00",
    },
    {
      id: 3,
      nome: "Cantina Express",
      endereco: "Laboratório de Informática",
      telefone: "(11) 77777-7777",
      emExpediente: false,
      vinculadoDesde: "08/02/2024",
      avaliacaoMedia: 4.7,
      totalPedidos: 89,
      horarioFuncionamento: "09:00 - 16:00",
    },
    {
      id: 4,
      nome: "Cantina Saudável",
      endereco: "Centro Esportivo",
      telefone: "(11) 66666-6666",
      emExpediente: true,
      vinculadoDesde: "12/02/2024",
      avaliacaoMedia: 4.6,
      totalPedidos: 45,
      horarioFuncionamento: "06:00 - 20:00",
    },
    {
      id: 5,
      nome: "Cantina Popular",
      endereco: "Refeitório Principal",
      telefone: "(11) 55555-5555",
      emExpediente: false,
      vinculadoDesde: "28/02/2024",
      avaliacaoMedia: 4.9,
      totalPedidos: 112,
      horarioFuncionamento: "11:00 - 15:00",
    },
  ])

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedCantina, setSelectedCantina] = useState<Cantina | null>(null)

  const handleDesvincular = (cantina: Cantina) => {
    setSelectedCantina(cantina)
    setShowConfirmDialog(true)
  }

  const confirmDesvincular = () => {
    if (selectedCantina) {
      setCantinas(cantinas.filter((c) => c.id !== selectedCantina.id))
      setShowConfirmDialog(false)
      setSelectedCantina(null)
    }
  }

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

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
              <button className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden md:inline">Meus Pedidos</span>
              </button>
              <button className="flex items-center space-x-2 text-yellow-300 font-medium">
                <Store className="w-5 h-5" />
                <span className="hidden md:inline">Cantinas</span>
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Cantinas vinculadas</h1>
          <p className="text-orange-100">Gerencie suas vinculações com as cantinas do campus</p>
        </div>

        {/* Cantinas List */}
        <div className="space-y-4">
          {cantinas.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Store className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma cantina vinculada</h3>
                <p className="text-gray-500">Entre em contato com as cantinas para se vincular</p>
              </CardContent>
            </Card>
          ) : (
            cantinas.map((cantina) => (
              <Card key={cantina.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar className="w-16 h-16 bg-orange-600">
                        <AvatarImage src={cantina.avatar || "/placeholder.svg"} alt={cantina.nome} />
                        <AvatarFallback className="bg-orange-600 text-white font-semibold text-lg">
                          {getInitials(cantina.nome)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg mb-1">{cantina.nome}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                cantina.emExpediente ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              Em expediente: {cantina.emExpediente ? "Sim" : "Não"}
                            </span>
                          </div>
                          <div className="space-y-1 text-gray-600 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Vinculado desde {cantina.vinculadoDesde}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Horário: {cantina.horarioFuncionamento}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span>📍 {cantina.endereco}</span>
                              <span>📦 {cantina.totalPedidos} pedidos</span>
                              <span>⭐ {cantina.avaliacaoMedia.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDesvincular(cantina)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Desvincular
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Statistics */}
        {cantinas.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {cantinas.filter((c) => c.emExpediente).length}
                </div>
                <p className="text-gray-700 font-medium">Cantinas Abertas</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {cantinas.reduce((total, c) => total + c.totalPedidos, 0)}
                </div>
                <p className="text-gray-700 font-medium">Total de Entregas</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  {(cantinas.reduce((total, c) => total + c.avaliacaoMedia, 0) / cantinas.length).toFixed(1)}
                </div>
                <p className="text-gray-700 font-medium">Avaliação Média</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        {cantinas.length > 0 && (
          <div className="mt-8">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Cantinas Abertas Agora</h4>
                    <div className="space-y-2">
                      {cantinas
                        .filter((c) => c.emExpediente)
                        .slice(0, 3)
                        .map((cantina) => (
                          <div key={cantina.id} className="text-sm text-green-700">
                            • {cantina.nome}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Dica do Dia</h4>
                    <p className="text-sm text-orange-700">
                      Mantenha-se ativo durante os horários de pico (11h-14h e 18h-20h) para receber mais pedidos!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Confirm Desvincular Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Desvinculação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Tem certeza que deseja se desvincular da <strong>{selectedCantina?.nome}</strong>?
            </p>
            <p className="text-sm text-gray-500">
              Você não receberá mais pedidos desta cantina até ser vinculado novamente.
            </p>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={confirmDesvincular} variant="destructive" className="flex-1">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
