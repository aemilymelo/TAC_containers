'use client';
import { GetServerSideProps } from "next";
import { createContext, useEffect, useState } from "react";
import { UserInfo } from "../models/UserInfo";
import { AccountCredentials } from "../models/AccountCredentials";
import { useAuthService } from "../seguranca/auth.service";
import { API_1 } from "../config/api";

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserInfo | null;
    signIn: (username: string, passowrd: string) => Promise<UserInfo>,
    signInWithToken: (token: string) => Promise<UserInfo>,
    logout: () => void,
    isLoading: boolean;
    isHttpUnauthorized: boolean;
    httpUnauthorized: (isUnauthorized: boolean) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {

    const [user, setUser] = useState<UserInfo | null>(null);

    const servico = useAuthService(API_1+"/auth");

    const isAuthenticated = !!user;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isHttpUnauthorized, setHttpUnauthorized] = useState<boolean>(false);

    useEffect(() => {

        async function loadingUserLoged() {

            setIsLoading(true);

            try {

                const userInfo: UserInfo = await servico.getUserInfo();

                setUser(userInfo)

                setHttpUnauthorized(false);

            } catch (error) {
                //console.log("error: **** "+error)
            }

            setIsLoading(false);
        }

        loadingUserLoged()

    }, [])

    async function signIn(username: string, password: string) {

        setHttpUnauthorized(false);

        const body: AccountCredentials = {
            username: username,
            password: password,
        }

        // if((body.username.trim()=='') || body.password.trim()==''){
        //     throw Error("Credencias do usuário devem ser informadas")
        // }

        const user: any = await servico.signin(body)
        localStorage.setItem('token', user.AuthenticationResult.AccessToken)
        setUser(user)

        return user;
    }

    async function signInWithToken(token: string) {

        setHttpUnauthorized(false);

        const user: UserInfo = await servico.signinWithToken(token)

        setUser(user)

        return user;
    }

    async function logout() {

        setHttpUnauthorized(false);

        await servico.logout()
        setUser(null)

        return user;
    }

    async function httpUnauthorized(isUnauthorized: boolean) {

        setHttpUnauthorized(isUnauthorized);

    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, signIn, signInWithToken,
            user, isLoading, logout,
            isHttpUnauthorized, httpUnauthorized
        }}>

            {children}

        </AuthContext.Provider>
    )
}
