"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function EntregadorLoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você faria a validação do login
    // Por enquanto, vamos redirecionar diretamente
    router.push("/dashboard/entregador")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Login Entregador</h1>
          <p className="text-slate-600">Entre na sua conta para fazer entregas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="entregador@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Não tem conta?{" "}
          <Link href="/cadastro/entregador" className="text-orange-500 hover:underline">
            Cadastre-se
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
