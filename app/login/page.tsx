"use client"

import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEndIcon } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted md:flex lg:flex items-center justify-center overflow-hidden">
        <img
          src="/logo.png"
          alt="Image"
          className="absolute inset-0 h-[30%] w-[30%] object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
