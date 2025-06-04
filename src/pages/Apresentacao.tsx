
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Grid } from "@mui/material";

export default function Apresentacao() {
  const [conteudoTexto, setConteudoTexto] = useState<string>("");

  const aoMudarTexto = (novoTexto: string) => {
    setConteudoTexto(novoTexto);
  };

  return (
    <Layout titulo="Apresentação e Introdução">
      <Grid container spacing={2}>
      </Grid>
    </Layout>
  );
}
