
'use client';


import TableView from "@/app/component/table/TableView";
import { useCUlturaService } from "@/app/v2/service/useCulutraService";
import { useServiceV2 } from "@/app/v2/service/user";
import { Alert, Box, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateCultura from "./create";
import { usePropriedadeServices } from "@/app/service/propriedade.service";


const CulturaPage: React.FC = () => {
    const title = 'Culturas plantadas'
    const service = useCUlturaService();

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


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
        service.findAll2()
            .then((data: any) =>{
                console.log(title+" encontrados:", data);
                 setList(data.data.users)
                }).catch((error) => {
                console.error("Erro ao buscar cultura:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
    <div className=" m-10 p-20 w-full" >


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
          { property: "tipo", label: "Tipo" },
          { property: "tipo", label: "Tipo" },
          { type: "action", label: "Remover" },
        ]}
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
    
            bgcolor: "background.paper",


          }}
        >
           <CreateCultura />
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
};

export default CulturaPage;