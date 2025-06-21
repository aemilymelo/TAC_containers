"use client";
import React, { useEffect, useState } from "react";
import { useService } from "../../src/service/user.service";
import MenuLateral from "../../menu/page";
import "../../../app/globals.css";
import Table from "@/app/component/table/Table";

export default function HomePage() {
    const [list, setList] = useState<any[]>([]);
    const rows: React.ReactNode[] = [];
    const service = useService();

    useEffect(() => {
        service.findAll().then((response: any) => {
            console.log("Usuários encontrados:", response);
            setList(response);
            response.forEach((item: any) => {
            rows.push(
            <tr key={item.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.nome}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.email}</td>
            </tr>
            );
  });
        }).catch((error) => {
            console.error("Erro ao buscar usuários:", error);
        });
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
}