"use client";
import React, { useEffect, useState } from "react";
import { useService } from "../../service/user.service";

import "../../../app/globals.css";
import TableView from "@/app/component/table/TableView";
import { Alert, Box, Modal, Snackbar, Typography } from "@mui/material";
import { useEstacaoService } from "@/app/service/estacao.service";
import CreateEstacao from "./create";


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

export default function Estacao() {

  const [list, setList] = useState<any[]>([]);
  const rows: React.ReactNode[] = [];
  const service = useEstacaoService();
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
        console.log("Usuários encontrados:", response);
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
        console.error("Erro ao buscar estação:", error);
      });
  }, []);
  return (
    <div className=" w-full">
      <TableView
        openModal={handleOpen}
        title="Estação meteorológica "
        list={list}
        columns={[
          { property: "id", label: "ID" },
          { property: "nome", label: "Nome" },
          { property: "tipo", label: "Tipo" },
          { property: "tipo", label: "Tipo" },
        ]}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateEstacao />
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
