
'use client';
import { useServiceV2 } from '@/app/src/v2/service/user';
import React, { useState } from 'react';



const CREATE_USER_MUTATION = `
    mutation CreateUser($nome: String!, $email: String!, $idade: Int!) {
        addUser(nome: $nome, email: $email, idade: $idade) {
            nome
            email
            idade
        }
    }
`;

export default function UserCreatePage() {
    const [form, setForm] = useState({ nome: '', email: '', idade: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const service = useServiceV2();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const variables = {
                nome: form.nome,
                email: form.email,
                idade: Number(form.idade),
            };
            const res = await service.execute(CREATE_USER_MUTATION, variables);
            if (res?.data?.createUser) {
                setSuccess('Usuário cadastrado com sucesso!');
                setForm({ nome: '', email: '', idade: '' });
            } else {
                setError('Erro ao cadastrar usuário.');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Cadastro de Usuário</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Idade</label>
                    <input
                        type="number"
                        name="idade"
                        value={form.idade}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                        required
                        min={0}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
                {success && <div className="text-green-600 mt-2">{success}</div>}
                {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
        </div>
    );
}