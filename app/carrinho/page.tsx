"use client"

import { useState } from "react"
import { Search, Grid3X3, ShoppingCart, MapPin, Clock, LogOut, Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface CartItem {
  id: number
  nome: string
  preco: number
  quantidade: number
  imagem: string
}

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      nome: "Hambúrguer Artesanal",
      preco: 25.9,
      quantidade: 2,
      imagem: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      nome: "Batata Frita Grande",
      preco: 12.5,
      quantidade: 1,
      imagem: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      nome: "Refrigerante Lata",
      preco: 5.0,
      quantidade: 3,
      imagem: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      nome: "Sanduíche Natural",
      preco: 18.0,
      quantidade: 1,
      imagem: "/placeholder.svg?height=80&width=80",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantidade: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.preco * item.quantidade, 0)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

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
                <Search className="w-5 h-5" />
                <span className="hidden md:inline">Pesquisar</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
                <Grid3X3 className="w-5 h-5" />
                <span className="hidden md:inline">Categorias</span>
              </button>
              <button className="flex items-center space-x-2 text-orange-300 font-medium">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline">Carrinho</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
                <MapPin className="w-5 h-5" />
                <span className="hidden md:inline">Cantinas</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:text-orange-300 transition-colors">
                <Clock className="w-5 h-5" />
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cantina Name */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
            Cantina Central
          </h1>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cartItems.length === 0 ? (
            <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Seu carrinho está vazio</h3>
                <p className="text-gray-500">Adicione itens de uma cantina para continuar</p>
              </CardContent>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Item Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.imagem || "/placeholder.svg"}
                        alt={item.nome}
                        className="w-20 h-20 object-cover rounded-lg bg-blue-600"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.nome}</h3>
                      <p className="text-gray-600 font-medium">{formatPrice(item.preco)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>

                      <span className="w-8 text-center font-medium text-gray-800">{item.quantidade}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Total and Checkout */}
        {cartItems.length > 0 && (
          <div className="space-y-4">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(calculateTotal())}</span>
                </div>
              </CardContent>
            </Card>

            <Link href="/checkout">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold" size="lg">
                Finalizar Pedido
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
