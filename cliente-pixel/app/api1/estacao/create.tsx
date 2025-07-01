import { useEstacaoService } from "@/app/service/estacao.service";
import React, { useState } from "react";


const containerStyle: React.CSSProperties = {


    padding: 24,
    borderRadius: 12,

    fontFamily: "Segoe UI, Arial, sans-serif",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
    color: "#333",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    marginBottom: 18,

    borderRadius: 6,
    fontSize: 16,
    background: "#fff",
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 0",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
};

export default function EstacaoCreate() {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [id, setId] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const service = useEstacaoService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        try {
            await service.insert({ nome, tipo, id: id });
            setSuccess("Estação criada com sucesso!");
            setNome("");
            setTipo("");
            setId("");
        } catch (err: any) {
            setError("Erro ao criar estação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>

            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="nome">
                    Nome
                </label>
                <input
                    style={inputStyle}
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Estação Clima Norte"
                    required
                />

                <label style={labelStyle} htmlFor="tipo">
                    Tipo
                </label>
                <input
                    style={inputStyle}
                    id="tipo"
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Ex: Automática"
                    required
                />

                <label style={labelStyle} htmlFor="id">
                    ID
                </label>
                <input
                    style={inputStyle}
                    id="id"
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Ex: 1"
                    required
                />

                <button style={buttonStyle} type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Criar Estação"}
                </button>
                {success && <div style={{ color: "#16a34a", marginTop: 16 }}>{success}</div>}
                {error && <div style={{ color: "#dc2626", marginTop: 16 }}>{error}</div>}
            </form>
        </div>
    );
}