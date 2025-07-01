import { usePropriedadeServices } from "@/app/service/propriedade.service";
import React, { useState } from "react";



const CreatePropriedade: React.FC = () => {
    const [nome, setNome] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const service = usePropriedadeServices();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        await service.insert({ nome, localizacao });
        setLoading(false);
        setSuccess(true);
    };

    return (
        <div style={{
            padding: 24,
            borderRadius: 12,
            fontFamily: "sans-serif"
        }}>
            <h2 style={{ marginBottom: 24, color: "#2d3748" }}>Nova Propriedade</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 6, color: "#4a5568" }}>
                        Nome
                    </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 8,
                            borderRadius: 6,
                            border: "1px solid #cbd5e0",
                            fontSize: 16
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", marginBottom: 6, color: "#4a5568" }}>
                        Localização
                    </label>
                    <input
                        type="text"
                        value={localizacao}
                        onChange={e => setLocalizacao(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 8,
                            borderRadius: 6,
                            border: "1px solid #cbd5e0",
                            fontSize: 16
                        }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 10,
                        borderRadius: 6,
                        border: "none",
                        background: "#3182ce",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                {success && (
                    <div style={{ marginTop: 16, color: "#38a169", fontWeight: 500 }}>
                        Propriedade cadastrada com sucesso!
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreatePropriedade;