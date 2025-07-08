"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
  Chip,
  Container,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCUlturaService } from "../../v2/service/useCulutraService";
import { usePropriedadeServices } from "@/app/service/propriedade.service";

interface CulturaFormData {
  nome: string;
  variedade: string;
  dataPlantio: string;
  dataColheitaPrevista: string;
  dataColheitaReal: string;
  area: number | "";
  status:
    | "plantado"
    | "germinando"
    | "crescimento"
    | "floração"
    | "colhido"
    | "perdido";
  latitude: number | "";
  longitude: number | "";
  propriedade: string;
  observacoes: string;
}

const statusOptions = [
  { value: "plantado", label: "Plantado", color: "#4caf50" },
  { value: "germinando", label: "Germinando", color: "#8bc34a" },
  { value: "crescimento", label: "Crescimento", color: "#cddc39" },
  { value: "floração", label: "Floração", color: "#ffeb3b" },
  { value: "colhido", label: "Colhido", color: "#ff9800" },
  { value: "perdido", label: "Perdido", color: "#f44336" },
];

const culturasComuns = [
  "Milho",
  "Soja",
  "Tomate",
  "Alface",
  "Cenoura",
  "Batata",
  "Feijão",
  "Arroz",
  "Trigo",
  "Cana-de-açúcar",
  "Café",
  "Algodão",
  "Mandioca",
];

export default function CreateCultura() {
  const router = useRouter();
  const culturaService = useCUlturaService();
    const propriedadeService = usePropriedadeServices();
  const [formData, setFormData] = useState<CulturaFormData>({
    nome: "",
    variedade: "",
    dataPlantio: "",
    dataColheitaPrevista: "",
    dataColheitaReal: "",
    area: "",
    status: "plantado",
    latitude: "",
    longitude: "",
    propriedade: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [propriedades, setPropriedades] = useState<
    Array<{ id: string; nome: string }>
  >([]);

  useEffect(() => {
    // Simular carregamento de propriedades - substitua por chamada real à API
    propriedadeService.findAll().then((res: any)=>{
        console.log('propriedades', res)
        setPropriedades(res);
    })
    // setPropriedades([
    //   { id: "1", nome: "Fazenda São João" },
    //   { id: "2", nome: "Sítio Verde" },
    //   { id: "3", nome: "Fazenda Esperança" },
    // ]);
  }, []);

  const handleInputChange = (field: keyof CulturaFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.nome.trim()) {
      setError("Nome da cultura é obrigatório");
      return false;
    }
    if (!formData.dataPlantio) {
      setError("Data de plantio é obrigatória");
      return false;
    }
    if (!formData.area || formData.area <= 0) {
      setError("Área deve ser maior que zero");
      return false;
    }
    if (!formData.propriedade) {
      setError("Propriedade é obrigatória");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const culturaData = {
        nome: formData.nome,
        variedade: formData.variedade || undefined,
        dataPlantio: formData.dataPlantio,
        dataColheitaPrevista: formData.dataColheitaPrevista || undefined,
        dataColheitaReal: formData.dataColheitaReal || undefined,
        area: Number(formData.area),
        status: formData.status,
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
        propriedade: { id: formData.propriedade },
        observacoes: formData.observacoes || undefined,
      };

      await culturaService.createCultura(culturaData);
      setSuccess(true);

      setTimeout(() => {
        router.push("/api2/cultura");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Erro ao criar cultura");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/api2/cultura");
  };

  return (
    <div>
      <Card>
        <CardContent>
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Cultura criada com sucesso! Redirecionando...
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>

              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  sx={{ mb: 3 }}
                >
                  Informações Básicas
                </Typography>

                <div style={{display: 'flex'}}>
        
                    <TextField
                      select
                      label="Nome da Cultura *"
                      variant="outlined"
                      fullWidth
                      value={formData.nome}
                      onChange={(e) =>
                        handleInputChange("nome", e.target.value)
                      }
                      helperText="Selecione ou digite o nome da cultura"
                    >
                      {culturasComuns.map((cultura) => (
                        <MenuItem key={cultura} value={cultura}>
                          {cultura}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Variedade"
                      variant="outlined"
                      fullWidth
                      value={formData.variedade}
                      onChange={(e) =>
                        handleInputChange("variedade", e.target.value)
                      }
                      helperText="Variedade específica da cultura (opcional)"
                    />
      
                </div>
                <div style={{ display: "flex" }}>
                  <TextField
                    label="Área (hectares) *"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status *</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      label="Status *"
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Chip
                              size="small"
                              label={option.label}
                              sx={{
                                backgroundColor: option.color,
                                color: "white",
                                minWidth: 80,
                              }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Propriedade *</InputLabel>
                    <Select
                      value={formData.propriedade}
                      onChange={(e) =>
                        handleInputChange("propriedade", e.target.value)
                      }
                      label="Propriedade *"
                    >
                      {propriedades.map((prop) => (
                        <MenuItem key={prop.id} value={prop.id}>
                          {prop.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  sx={{ mb: 3 }}
                >
                  Cronograma
                </Typography>

                <div style={{display:'flex'}}>
              
                    <TextField
                      label="Data de Plantio *"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={formData.dataPlantio}
                      onChange={(e) =>
                        handleInputChange("dataPlantio", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
               

            
                    <TextField
                      label="Data Prevista de Colheita"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={formData.dataColheitaPrevista}
                      onChange={(e) =>
                        handleInputChange(
                          "dataColheitaPrevista",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                

                    <TextField
                      label="Data Real de Colheita"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={formData.dataColheitaReal}
                      onChange={(e) =>
                        handleInputChange("dataColheitaReal", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
             
                </div>
              </Box>

                <TextField
                  label="Observações"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={1}
                  value={formData.observacoes}
                  onChange={(e) =>
                    handleInputChange("observacoes", e.target.value)
                  }
                  helperText="Informações adicionais sobre a cultura"
                />
   
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
                size="large"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                size="large"
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "Salvando..." : "Salvar Cultura"}
              </Button>
            </div>

            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
