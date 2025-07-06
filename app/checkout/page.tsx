"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, MapPin, CreditCard, Banknote, Smartphone, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface Address {
  id: number
  nome: string
  endereco: string
  telefone: string
}

interface PaymentMethod {
  id: string
  tipo: "cartao" | "dinheiro" | "pix"
  nome: string
  detalhes?: string
}

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<number>(1)
  const [selectedPayment, setSelectedPayment] = useState<string>("cartao-1")
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)

  const [addresses] = useState<Address[]>([
    {
      id: 1,
      nome: "Hospital Veterinário",
      endereco: "Rua X, Y, 123",
      telefone: "777-888-00",
    },
    {
      id: 2,
      nome: "Hospital Universitário",
      endereco: "Rua X, Y, 123",
      telefone: "777-888-00",
    },
    {
      id: 3,
      nome: "Biblioteca Central",
      endereco: "Av. Principal, 456",
      telefone: "777-999-11",
    },
  ])

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "cartao-1",
      tipo: "cartao",
      nome: "Cartão de Crédito",
      detalhes: "**** **** **** 8932",
    },
    {
      id: "dinheiro-1",
      tipo: "dinheiro",
      nome: "Dinheiro",
      detalhes: "Pagamento na entrega",
    },
    {
      id: "pix-1",
      tipo: "pix",
      nome: "PIX",
      detalhes: "Pagamento instantâneo",
    },
  ])

  const [newCard, setNewCard] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  })

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setNewCard({ ...newCard, numero: formatted })
    }
  }

  const handleAddCard = () => {
    if (newCard.numero && newCard.nome && newCard.validade && newCard.cvv) {
      const newPaymentMethod: PaymentMethod = {
        id: `cartao-${Date.now()}`,
        tipo: "cartao",
        nome: "Cartão de Crédito",
        detalhes: `**** **** **** ${newCard.numero.slice(-4)}`,
      }
      setPaymentMethods([...paymentMethods, newPaymentMethod])
      setSelectedPayment(newPaymentMethod.id)
      setNewCard({ numero: "", nome: "", validade: "", cvv: "" })
      setShowCardForm(false)
      setShowPaymentDialog(false)
    }
  }

  const getPaymentIcon = (tipo: string) => {
    switch (tipo) {
      case "cartao":
        return <CreditCard className="w-5 h-5" />
      case "dinheiro":
        return <Banknote className="w-5 h-5" />
      case "pix":
        return <Smartphone className="w-5 h-5" />
      default:
        return <CreditCard className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-500 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/carrinho" className="text-white hover:text-orange-300">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="text-white text-2xl font-bold">
              Ran<span className="text-orange-300">Go</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Finalizando a compra</h1>
          <p className="text-gray-600">Escolha onde você quer receber seu pedido e a forma de pagamento</p>
        </div>

        {/* Address Selection */}
        <section className="mb-8">
          <div className="space-y-3">
            {addresses.slice(0, 2).map((address) => (
              <Card
                key={address.id}
                className={`cursor-pointer transition-all ${
                  selectedAddress === address.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedAddress(address.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {selectedAddress === address.id ? (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-800">{address.nome}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {address.endereco}, {address.telefone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
            <DialogTrigger asChild>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-3">
                Ver mais endereços listados
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Escolher Endereço</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {addresses.map((address) => (
                  <Card
                    key={address.id}
                    className={`cursor-pointer transition-all ${
                      selectedAddress === address.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => {
                      setSelectedAddress(address.id)
                      setShowAddressDialog(false)
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {selectedAddress === address.id ? (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">{address.nome}</h4>
                          <p className="text-gray-600 text-xs">
                            {address.endereco}, {address.telefone}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Payment Method */}
        <section className="mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPaymentIcon(paymentMethods.find((p) => p.id === selectedPayment)?.tipo || "cartao")}
                <div>
                  <p className="font-medium text-gray-800">
                    {paymentMethods.find((p) => p.id === selectedPayment)?.nome}
                  </p>
                  <p className="text-sm text-gray-600">
                    {paymentMethods.find((p) => p.id === selectedPayment)?.detalhes}
                  </p>
                </div>
              </div>

              <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogTrigger asChild>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">alterar</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Método de Pagamento</DialogTitle>
                  </DialogHeader>

                  {!showCardForm ? (
                    <div className="space-y-4">
                      <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-3">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                              {getPaymentIcon(method.tipo)}
                              <div>
                                <p className="font-medium">{method.nome}</p>
                                <p className="text-sm text-gray-600">{method.detalhes}</p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowCardForm(true)} className="flex-1">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Cartão
                        </Button>
                        <Button onClick={() => setShowPaymentDialog(false)} className="flex-1">
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número do Cartão</label>
                        <input
                          type="text"
                          value={newCard.numero}
                          onChange={handleCardNumberChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome no Cartão</label>
                        <input
                          type="text"
                          value={newCard.nome}
                          onChange={(e) => setNewCard({ ...newCard, nome: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="NOME COMPLETO"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Validade</label>
                          <input
                            type="text"
                            value={newCard.validade}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "")
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + "/" + value.substring(2, 4)
                              }
                              setNewCard({ ...newCard, validade: value })
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            value={newCard.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "")
                              setNewCard({ ...newCard, cvv: value })
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="000"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowCardForm(false)} className="flex-1">
                          Voltar
                        </Button>
                        <Button onClick={handleAddCard} className="flex-1">
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </section>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold" size="lg">
            Confirmar Pedido
          </Button>

          <div className="text-center">
            <Link href="/carrinho" className="text-gray-600 hover:text-gray-800 text-sm">
              Voltar ao carrinho
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
