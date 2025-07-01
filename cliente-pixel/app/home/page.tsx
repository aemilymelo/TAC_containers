import React from "react";

export default function HomePage() {
    return (
        <main style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f6fa"
        }}>
            <div style={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                padding: "48px 32px",
                minWidth: "320px",
                textAlign: "center"
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: "2rem",
                    color: "#222",
                    letterSpacing: "1px"
                }}>
                    Pixel Tac
                </h1>
            </div>
        </main>
    );
}