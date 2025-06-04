import styles from "./inputPage.module.css";
import TextEditor from "../components/TextEditor";

interface InputTextPageProps {
  title: string;
  initialValue: string;
  onSave: (content: string) => void; // Passando função de salvar
}

export default function InputTextPage({
  title,
  initialValue,
  onSave,
}: InputTextPageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        width: "100%", // novo
      }}
    >
      <h1 className={styles.tileInput}>{title}</h1>
      <div style={{ flex: 1, overflow: "auto", width: "100%", height: "100%"  }}>
        <TextEditor initialValue={initialValue} onSave={onSave} />
      </div>
    </div>
  );
}
