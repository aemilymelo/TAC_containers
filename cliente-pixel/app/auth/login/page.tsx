'use client';
import React, { useContext, useState } from 'react';
import { AccountCredentials } from '../../src/models/AccountCredentials';
import { AuthContext } from '../../src/contexts/AuthContext';
import { UserInfo } from '../../src/models/UserInfo';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {

    const { signIn } = useContext(AuthContext)
    const router = useRouter(); 
    const [loading, setLoading] = useState(false)
    const [isErrorUsername, setErrorUsername] = useState<boolean>(false)
    const [isErrorPassword, setErrorPassword] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    async function handleSubmit(e: any) {
        e.preventDefault()

        setLoading(true)

        const body: AccountCredentials = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }

        const errorPass: boolean = !(body.password && (body.password.trim() != ''));
        const errorUser: boolean = !(body.username && (body.username.trim() != ''));

        await setErrorPassword(errorPass);
        await setErrorUsername(errorUser);

        if (errorPass || errorUser) {
            setLoading(false)
            return;
        }

        try {

            const user: UserInfo = await signIn(body.username, body.password)

            setLoading(false)

            router.push('/home')

        } catch (error: any) {

            let msgError = "Erro ao conectar o servidor";

            if (error.response && error.response.data && error.response.data.message) {
                msgError = error.response.data.message;
            } 
            setErrorMsg(msgError)
            setLoading(false);
        }
    }

    
    return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        className="flex flex-col gap-6 w-full max-w-sm  p-8 rounded shadow" 
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <label className="flex flex-col gap-2">
          <span className="font-medium ">Username</span>
          <input
            type="text"
            name="username"
            required
            value="kaique@gmail.com"
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
            autoComplete="username"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium">Password</span>
          <input
            type="password"
            name="password"
            value="@Utfpr2024"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
            autoComplete="current-password"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Entrar
        </button>
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      </form>
    </div>
    );
};

export default Login;