// Arquivo: app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import MenuLateral from "./menu/page";
import ButtonAppBar from "./component/appBar/ButtonAppBar";
import React, { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenu, setIsmenu] = useState(false)
  useEffect(()   =>{
    const _isMenu =localStorage.getItem('token')
    console.log('isMenu', !!_isMenu)
    setIsmenu(!!_isMenu)
  },[isMenu])
  return (

    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>

      <body style={{display: 'flex', width: '100%', height: '100vh', position: 'relative', }}>
        <AuthProvider>

          <div style={{ width: '100%', overflow:'hidden'  }}>
          <ButtonAppBar />

            <div style={{position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'auto', height:'80%'}}>
               {children}
            </div>
          <div style={{height: '10%', background: 'var(--gray)'}}>
         
          </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}