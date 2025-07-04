import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateProject } from "@/services/projetos/projetoService";
import { ProjectDTO } from "@/services/projetos/projetoService";

interface ModalEditProjectProps {
  open: boolean;
  onClose: () => void;
  project: ProjectDTO;
  onUpdated?: () => void;
}

export function ModalEditProject({
  open,
  onClose,
  project,
  onUpdated,
}: ModalEditProjectProps) {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [corHex, setCorHex] = useState("#000000");
  const [dashUrl, setDashUrl] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setLogoUrl(project.logoUrl || "");
      setCorHex(project.corHex || "#000000");
      setDashUrl(project.dashUrl || "");
    }
  }, [project]);

  async function handleUpdate() {
    try {
      await updateProject({
        id: project.id,
        name,
        logoUrl,
        corHex,
        dashUrl,
      });
      if (onUpdated) onUpdated();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Projeto</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="ID" value={project.id} disabled fullWidth />
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="URL da Logo"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            fullWidth
          />
          <TextField
            label="URL do Dashboard"
            value={dashUrl}
            onChange={(e) => setDashUrl(e.target.value)}
            fullWidth
          />
          <TextField
            label="Cor HEX"
            type="color"
            value={corHex}
            onChange={(e) => setCorHex(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleUpdate}>
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
