import React from 'react';

type TableRow = {
    id: number | string;
    nome: string;
    email: string;
    [key: string]: string | number;
};

type TableProps = {
    list: TableRow[];
    columns: any[];
};

const Table: React.FC<TableProps> = ({ list, columns }) => {
    return (
        <div className="m-10 p-20 w-full">
            <table className="shadow-md table-auto " style={{ width: '100%' }}>
                <thead>
                    <tr >
                        {columns.map((column) => (
                            <th className='text-left p-2 ' key={column.id}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'center', padding: '16px' }}>
                                Não existem dados.
                            </td>
                        </tr>
                    )}
                    {list.map((item) => (
                        <tr className='p-4' key={item.id}>
                            {columns.map((column) => (
                                <td className='p-2' key={column.id}>{item[column.id]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;