"use client";
import React, { useEffect, useState } from "react";
import { useService } from "../../service/user.service";

import "../../../app/globals.css";
import TableView from "@/app/component/table/TableView";
import { Alert, Box, Modal, Snackbar, Typography } from "@mui/material";
import { usePropriedadeServices } from "@/app/service/propriedade.service";
import CreatePropriedade from "./create";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PropriedadesPage() {
    const title = "Propriedades"
  const [list, setList] = useState<any[]>([]);
  const rows: React.ReactNode[] = [];
  const service = usePropriedadeServices();
  const [message, setMessage] = useState({ message: "", status: "" });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log("openModal");
    setOpen(true);
  };

  const handleCloseCadastro = (status: boolean, messsage: string) => {
    if (status) {
      setMessage({ message: messsage, status: "sucesso" });
    } else {
      setMessage({ message: messsage, status: "error" });
    }
    handleClose();
  };
  const handleClose = () => {
    setTimeout(() => {
      setMessage({ message: "", status: "" });
    }, 3000);
    setOpen(false);
  };

  useEffect(() => {
    service
      .findAll()
      .then((response: any) => {
        console.log(title+" encontrados:", response);
        setList(response);
        response.forEach((item: any) => {
          rows.push(
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.nome}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.email}
              </td>
            </tr>
          );
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);
  return (
    <div className=" w-full">
      <TableView
              removeItem={(id)=> service.remove(id.id).then(()=>{
      setMessage({ message: "Registro remvido ", status: "sucesso" });
        }).catch(error=>{
      setMessage({ message: "Ops, alguma falha no sistema", status: "error" });
        })}
        openModal={handleOpen}
        title={title}
        list={list}
        columns={[
          { property: "id", label: "ID" },
          { property: "nome", label: "Nome" },
          { property: "localizacao", label: "Localização" },
          { type: "action", label: "Remover" },
        ]}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <CreatePropriedade />
        </Box>
      </Modal>

      <Snackbar open={message.message != ""}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
