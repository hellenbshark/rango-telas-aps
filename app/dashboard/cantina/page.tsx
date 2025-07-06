"use client"

import type React from "react"

import { useState } from "react"
import { User, Menu, ShoppingBag, LogOut, Plus, Edit, Camera, X, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"

interface MenuItem {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
}

export default function CantinaHomePage() {
  const [cardapio, setCardapio] = useState<MenuItem[]>([])
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
  })

  const formatCurrency = (value: string) => {
    // Remove tudo que não é dígito
    const numericValue = value.replace(/\D/g, "")

    // Converte para número e divide por 100 para ter os centavos
    const floatValue = Number.parseFloat(numericValue) / 100

    // Formata como moeda brasileira
    if (numericValue === "") return ""

    return floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setNewItem({ ...newItem, preco: formatted })
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.nome && newItem.descricao && newItem.preco && newItem.imagem) {
      // Remove formatação para salvar como número
      const numericPrice = Number.parseFloat(newItem.preco.replace(/[^\d,]/g, "").replace(",", "."))

      const item: MenuItem = {
        id: Date.now(),
        nome: newItem.nome,
        descricao: newItem.descricao,
        preco: numericPrice,
        imagem: newItem.imagem,
      }
      setCardapio([...cardapio, item])
      setNewItem({ nome: "", descricao: "", preco: "", imagem: "" })
      setIsAddingItem(false)
    }
  }

  const removeItem = (id: number) => {
    setCardapio(cardapio.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-500 shadow-sm">
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
            <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
              <Menu className="w-5 h-5" />
              <span>Cardápio</span>
            </button>
            <Link
              href="/dashboard/cantina/pedidos"
              className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Pedidos</span>
            </Link>
            <Link
              href="/dashboard/cantina/entregadores"
              className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors"
            >
              <Bike className="w-5 h-5" />
              <span>Entregadores</span>
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
        {/* Cantina Profile */}
        <section className="mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Foto da cantina"
                    className="w-full md:w-80 h-48 object-cover rounded-lg"
                  />
                  <Button className="mt-2 w-full bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Mudar foto
                  </Button>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Nome da Cantina</h1>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, deleniti natus ex eius quo
                    voluptas ratione nulla blanditiis tenetur vitae.
                  </p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span>📍 Endereço</span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cardápio Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Cardápio do Dia</h2>
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Item ao Cardápio</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Prato</label>
                    <input
                      type="text"
                      value={newItem.nome}
                      onChange={(e) => setNewItem({ ...newItem, nome: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ex: Hambúrguer Artesanal"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <textarea
                      value={newItem.descricao}
                      onChange={(e) => setNewItem({ ...newItem, descricao: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Descreva o prato..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                    <input
                      type="text"
                      value={newItem.preco}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="R$ 0,00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                    <input
                      type="url"
                      value={newItem.imagem}
                      onChange={(e) => setNewItem({ ...newItem, imagem: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://exemplo.com/imagem.jpg"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      Adicionar
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddingItem(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {cardapio.length === 0 ? (
            <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500 mb-4">
                  <Menu className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Seu cardápio do dia está vazio</h3>
                  <p>Adicione itens ao seu cardápio para que os clientes possam fazer pedidos.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardapio.map((item) => (
                <Card key={item.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={item.imagem || "/placeholder.svg"}
                        alt={item.nome}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{item.nome}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.descricao}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">
                          {item.preco.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
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
