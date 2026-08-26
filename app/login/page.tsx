"use client";

import React, { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      <div className="flex flex-col gap-4 p-6 md:p-10 justify-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="size-8 animate-spin text-primary" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted/40 md:flex lg:flex items-center justify-center overflow-hidden border-l border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
        <div className="relative flex flex-col items-center gap-6 p-8 text-center max-w-md">
          <Image
            src="/logo.png"
            alt="Reclaim Hope Logo"
            width={240}
            height={90}
            priority
            className="h-auto w-48 object-contain drop-shadow-sm"
          />
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Reclaim Hope Rwanda
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Administrative portal for managing child sponsorships, donor relations, programs, and outreach initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
