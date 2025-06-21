
'use client';
import Table from "@/app/component/table/Table";
import { useServiceV2 } from "@/app/src/v2/service/user";
import React, { useEffect, useState } from "react";

const UserListPage: React.FC = () => {
    const service = useServiceV2();
   const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.findAll2()
            .then((data: any) =>{
                console.log("Usuários encontrados:", data);
                 setList(data.data.users)
                }).catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
    <div className=" m-10 p-20 w-full" >
        <Table 
        list={list} 
        columns={[
            { id: 'id', label: 'ID' },
            { id: 'nome', label: 'Nome' },
            { id: 'email', label: 'Email' },
        ]} />
    </div>
    );
};

export default UserListPage;