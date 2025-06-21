'use client';
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"



interface AuthenticatedRouteProps {
    isValidaOrg?: boolean,
    children: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props: AuthenticatedRouteProps) => {

    function getIsPublicRoute(pathname: string) : boolean{

        const publicRoutes:string[] = [
            '/auth/login',
            '/auth/logout',
            '/about'
        ];

        const publicRoute = publicRoutes.filter(r => r == pathname)

        return (publicRoute.length>0);
    }

    const { user, isLoading, isHttpUnauthorized } = useContext(AuthContext)

    const router = useRouter()

    const isPublicRoute = ((typeof window !== "undefined") && getIsPublicRoute(window.location.pathname));

    if (isLoading) {
        return <div>Processando aguarde</div>
    }

    if(!isPublicRoute){

        if(!user){
            router.push('/auth/login')
            return null;
        }
    
        if(isHttpUnauthorized){
            router.push('/auth/login')
            return null;
        }

    }
    
    return (
        <>{props.children}</>
    )
}
