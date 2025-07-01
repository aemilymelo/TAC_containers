import { dadoClimaticoService } from "@/app/service/dadoClimatico.service";
import React, { useEffect, useState } from "react";

const containerStyle: React.CSSProperties = {
    borderRadius: 12,
};

const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    color: "#333",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    marginBottom: 18,
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: 16,
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 0",
    background: "#0078d4",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
};

export default function DadoClimaticoCreate() {
    const service = dadoClimaticoService();
    const [form, setForm] = useState({
        tipo: "",
        valor: "",
        dataHora:"",
        latitude: "",
        longitude: "",
        estacaoId:"",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "valor" ||
                name === "latitude" ||
                name === "longitude" ||
                name === "estacaoId"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        service.insert(form).then(res => {
            console.log('Registro inseridos com sucesso');
        });
    };
    useEffect(()=>{

    },[])
    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="tipo">
                    Tipo
                </label>
                <select
                    style={inputStyle}
                    id="tipo"
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                >
                    <option value="Temperatura">Temperatura</option>
                    <option value="Umidade">Umidade</option>
                    <option value="Pressão">Pressão</option>
                </select>

                <label style={labelStyle} htmlFor="valor">
                    Valor
                </label>
                <input
                    style={inputStyle}
                    type="number"
                    step="any"
                    id="valor"
                    name="valor"
                    value={form.valor}
                    onChange={handleChange}
                    required
                />

                <label style={labelStyle} htmlFor="dataHora">
                    Data e Hora
                </label>
                <input
                    style={inputStyle}
                    type="datetime-local"
                    id="dataHora"
                    name="dataHora"
                    value={form.dataHora.slice(0, 16)}
                    onChange={handleChange}
                    required
                />

                <label style={labelStyle} htmlFor="latitude">
                    Latitude
                </label>
                <input
                    style={inputStyle}
                    type="number"
                    step="any"
                    id="latitude"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    required
                />

                <label style={labelStyle} htmlFor="longitude">
                    Longitude
                </label>
                <input
                    style={inputStyle}
                    type="number"
                    step="any"
                    id="longitude"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    required
                />

                <label style={labelStyle} htmlFor="estacaoId">
                    Estação ID
                </label>
                <input
                    style={inputStyle}
                    type="number"
                    id="estacaoId"
                    name="estacaoId"
                    value={form.estacaoId}
                    onChange={handleChange}
                    required
                />

                <button style={buttonStyle} type="submit">
                    Cadastrar
                </button>
                {success && (
                    <div
                        style={{
                            marginTop: 16,
                            color: "#155724",
                            background: "#d4edda",
                            borderRadius: 6,
                            padding: "8px 0",
                            textAlign: "center",
                            fontWeight: 600,
                        }}
                    >
                        Cadastro realizado com sucesso!
                    </div>
                )}
            </form>
        </div>
    );
}