"use client";
import Table from "@/app/component/table/TableView";
import { dadoClimaticoService } from "@/app/service/dadoClimatico.service";
import { Alert, Box, Modal, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import DadoClimaticoCreate from "./create";

export default function HomePage() {
  const [list, setList] = useState<any[]>([]);
  const rows: React.ReactNode[] = [];
  const service = dadoClimaticoService();

  const [message, setMessage] = useState({ message: "", status: "" });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log("openModal");
    setOpen(true);
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
        console.error("Erro ao buscar dados climaticos:", error);
      });
  }, []);
  return (
    <div className=" m-10 p-20 w-full">
      <Table
        list={list}
        openModal={handleOpen}
        columns={[
          { property: "id", label: "ID" },
          { property: "tipo", label: "Nome" },
          { property: "valor", label: "Temperatura" },
          { property: "longitude", label: "longitude" },
          { property: "latitude", label: "latitude" },
        ]}
        title={"Dados Climáticos"}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
            <DadoClimaticoCreate />
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
