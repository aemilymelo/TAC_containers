
'use client';
import { useService } from '@/app/src/service/user.service';
import React, { useState } from 'react';




// Supondo que useService seja um hook customizado para lidar com requisições

export default function CadastroPage() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        password: '',
    });

    const service = useService();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit =  (e: React.FormEvent) => {
        e.preventDefault();
         service.insert(form).then((response) => {
            console.log('Usuário cadastrado com sucesso:', response)
        }).catch((error) => {
            console.error('Erro ao cadastrar usuário:', error)
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
                <div>
                    <label className="block text-gray-700">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Senha</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
             
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
             
                >
               Cadastrar
                </button>
            </form>
        </div>
    );
}