import { Button, Icon, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import Table from '@mui/material/Table';
type TableRow = {
    id: number | string;
    nome: string;
    email: string;
    [key: string]: string | number;
};

type TableProps = {
    title: string;
    list: TableRow[];
    columns: any[];
    openModal?: (event?: any)=> void
};

const TableView: React.FC<TableProps> = ({title, list, columns, openModal }) => {
    return (
        <div className="shadow-md m-10  ">
            <div className='header-table'>
                <h1> {title}</h1>
                
         <Button onClick={openModal} variant="contained">Novo item</Button>

            </div>
                <TableContainer >
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
    
                        {columns.map((column) => (
                            <TableCell className='text-left p-2 ' key={column.id}>{column.label}</TableCell>
                        ))}
       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.length === 0 && (
                        <TableRow>
                            <td colSpan={3} style={{ textAlign: 'center', padding: '16px' }}>
                                Não existem dados.
                            </td>
                        </TableRow>
                    )}
                    {list.map((item) => (
                        <TableRow className='p-4' key={item.id}>
                            {columns.map((column) => (
                                <TableCell  className='p-2' key={column.id}>{item[column.property]}</TableCell >
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
    </TableContainer>
        </div>
    );
};

export default TableView;