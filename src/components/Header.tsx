import styles from "./Header.module.css";
import icon from "../assets/layout-list.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={icon} alt="logo" />
      <strong>Suas Tarefas</strong>
    </header>
  );
}
