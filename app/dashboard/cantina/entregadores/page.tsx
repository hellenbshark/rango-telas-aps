"use client"

import type React from "react"

import { useState } from "react"
import { User, Menu, ShoppingBag, LogOut, Bike, Plus, ArrowLeft, UserCheck, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface Entregador {
  id: number
  nome: string
  email: string
  telefone: string
  status: "ativo" | "inativo" | "ocupado"
  vinculadoDesde: string
  avatar?: string
  avaliacaoMedia: number
  totalEntregas: number
}

export default function EntregadoresCantinaPage() {
  const [entregadores, setEntregadores] = useState<Entregador[]>([
    {
      id: 1,
      nome: "Carlos Silva",
      email: "carlos@email.com",
      telefone: "(11) 99999-9999",
      status: "ativo",
      vinculadoDesde: "15/01/2024",
      avaliacaoMedia: 4.8,
      totalEntregas: 156,
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(11) 88888-8888",
      status: "ocupado",
      vinculadoDesde: "22/01/2024",
      avaliacaoMedia: 4.9,
      totalEntregas: 203,
    },
    {
      id: 3,
      nome: "João Oliveira",
      email: "joao@email.com",
      telefone: "(11) 77777-7777",
      status: "ativo",
      vinculadoDesde: "08/02/2024",
      avaliacaoMedia: 4.7,
      totalEntregas: 89,
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana@email.com",
      telefone: "(11) 66666-6666",
      status: "inativo",
      vinculadoDesde: "12/02/2024",
      avaliacaoMedia: 4.6,
      totalEntregas: 45,
    },
    {
      id: 5,
      nome: "Pedro Lima",
      email: "pedro@email.com",
      telefone: "(11) 55555-5555",
      status: "ativo",
      vinculadoDesde: "28/02/2024",
      avaliacaoMedia: 4.9,
      totalEntregas: 112,
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedEntregador, setSelectedEntregador] = useState<Entregador | null>(null)
  const [newEntregador, setNewEntregador] = useState({
    nome: "",
    email: "",
    telefone: "",
  })

  const handleDesvincular = (entregador: Entregador) => {
    setSelectedEntregador(entregador)
    setShowConfirmDialog(true)
  }

  const confirmDesvincular = () => {
    if (selectedEntregador) {
      setEntregadores(entregadores.filter((e) => e.id !== selectedEntregador.id))
      setShowConfirmDialog(false)
      setSelectedEntregador(null)
    }
  }

  const handleAddEntregador = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntregador.nome && newEntregador.email && newEntregador.telefone) {
      const novoEntregador: Entregador = {
        id: Date.now(),
        nome: newEntregador.nome,
        email: newEntregador.email,
        telefone: newEntregador.telefone,
        status: "ativo",
        vinculadoDesde: new Date().toLocaleDateString("pt-BR"),
        avaliacaoMedia: 5.0,
        totalEntregas: 0,
      }
      setEntregadores([...entregadores, novoEntregador])
      setNewEntregador({ nome: "", email: "", telefone: "" })
      setShowAddDialog(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "ocupado":
        return "bg-yellow-100 text-yellow-800"
      case "inativo":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo"
      case "ocupado":
        return "Ocupado"
      case "inativo":
        return "Inativo"
      default:
        return status
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
              <Link
                href="/dashboard/cantina/pedidos"
                className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden md:inline">Meus Pedidos</span>
              </Link>
              <Link
                href="/dashboard/cantina"
                className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden md:inline">Cardápio</span>
              </Link>
              <button className="flex items-center space-x-2 text-orange-300 font-medium">
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Entregadores vinculados</h1>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Entregador
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Entregador</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEntregador} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={newEntregador.nome}
                    onChange={(e) => setNewEntregador({ ...newEntregador, nome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nome do entregador"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newEntregador.email}
                    onChange={(e) => setNewEntregador({ ...newEntregador, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={newEntregador.telefone}
                    onChange={(e) => setNewEntregador({ ...newEntregador, telefone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    Adicionar
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Entregadores List */}
        <div className="space-y-4">
          {entregadores.length === 0 ? (
            <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <Bike className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum entregador vinculado</h3>
                <p className="text-gray-500">Adicione entregadores para começar a fazer entregas</p>
              </CardContent>
            </Card>
          ) : (
            entregadores.map((entregador) => (
              <Card key={entregador.id} className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar className="w-16 h-16 bg-green-600">
                        <AvatarImage src={entregador.avatar || "/placeholder.svg"} alt={entregador.nome} />
                        <AvatarFallback className="bg-green-600 text-white font-semibold text-lg">
                          {getInitials(entregador.nome)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg mb-1">{entregador.nome}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entregador.status)}`}
                            >
                              Status: {getStatusText(entregador.status)}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Vinculado desde {entregador.vinculadoDesde}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UserCheck className="w-4 h-4" />
                              <span>{entregador.totalEntregas} entregas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>⭐ {entregador.avaliacaoMedia.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDesvincular(entregador)}
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
        {entregadores.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {entregadores.filter((e) => e.status === "ativo").length}
                </div>
                <p className="text-green-700 font-medium">Entregadores Ativos</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {entregadores.reduce((total, e) => total + e.totalEntregas, 0)}
                </div>
                <p className="text-blue-700 font-medium">Total de Entregas</p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  {(entregadores.reduce((total, e) => total + e.avaliacaoMedia, 0) / entregadores.length).toFixed(1)}
                </div>
                <p className="text-yellow-700 font-medium">Avaliação Média</p>
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
              Tem certeza que deseja desvincular <strong>{selectedEntregador?.nome}</strong>?
            </p>
            <p className="text-sm text-gray-500">
              O entregador não poderá mais fazer entregas para sua cantina até ser vinculado novamente.
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
