import { Layout } from "@/components/Layout";
import styles from "./home.module.css";

export default function Home() {
  const url = "https://ourworldindata.org/grapher/renewables-share-energy";

  return (
    <Layout titulo="Apresentação e Introdução">
      <iframe
        className={styles.iframe}
        src={url}
        allowFullScreen
        title="Apresentação YouTube"
      />
    </Layout>
  );
}
