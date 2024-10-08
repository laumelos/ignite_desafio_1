import todoLogo from "../assets/todoLogo.svg";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} className={styles.logo} alt="Project Logo" />
    </header>
  );
}
