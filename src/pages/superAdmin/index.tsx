import styles from "./superAdmin.module.css"
import { Layout } from "@/components/Layout";

export function SuperAdmin() {
  const url = "https://ourworldindata.org/";
  return (
    <Layout titulo="Tela de Admin">
      <iframe
        className={styles.iframe}
        src={url}
        allowFullScreen
        title="Apresentação YouTube"
      />
    </Layout>
  );
}
