import styles from "./Input.module.css";

export function Input({
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {  
  
  return (
      <input
        type="text"
        aria-label="newTaskName"
        placeholder="Adicione uma nova tarefa"
        className={styles.newTaskInput}
        {...rest}

      />
  );
}
