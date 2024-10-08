import { ITask } from "../../App";
import styles from "./Item.module.css";
import { Check, Trash } from "phosphor-react";

interface Props {
  data: ITask;
  removeTask: (id: number) => void;
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  function handleTaskToggle() {
    toggleTaskStatus({ id: data.id, value: !data.isChecked });
  }

  function handleRemoveTask() {
    removeTask(data.id);
  }

  const checkboxCheckedClassname = data.isChecked
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"];
  const paragraphCheckedClassname = data.isChecked
    ? styles["paragraph-checked"]
    : "";

  return (
    <div className={styles.item}>
      <label htmlFor="checkbox" onClick={handleTaskToggle}>
        <input
          readOnly
          type="checkbox"
          className={`${styles.checkbox} ${checkboxCheckedClassname} ${styles.actionButton}`}
        />
        {data.isChecked && (
          <Check size={12} weight="bold" className={styles.checkboxIcon} />
        )}
        <p className={paragraphCheckedClassname}>{data.text}</p>
      </label>
      <Trash
        size={18}
        onClick={handleRemoveTask}
        className={styles.deleteButton}
      />
    </div>
  );
}
