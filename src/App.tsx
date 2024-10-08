import { Header } from "./components/Header";
import styles from "./App.module.css";
import { Item } from "./components/list/Item";
import { useState } from "react";
import { PlusCircle, ClipboardText } from "phosphor-react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState("");

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1;
    }

    return prevValue;
  }, 0);

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (!confirm("Deseja mesmo apagar essa tarefa?")) {
      return;
    }

    setTasks(filteredTasks);
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value };
      }

      return { ...task };
    });

    setTasks(updatedTasks);
  }

  function handleAddTask() {
    console.log("Adding");
    if (!inputValue) {
      return;
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    };

    setTasks((state) => [...state, newTask]);
    setInputValue("");
  }

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.newTaskBar}>
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button onClick={handleAddTask}>
          <PlusCircle size={24} />
        </Button>
      </div>
      <div className={styles.tasks}>
        <header className={styles.tasksInfo}>
          <span>
            <p className={styles.tasksCreated}>Tarefas criadas</p>
            <div className={styles.counter}>{tasks.length}</div>
          </span>
          <span>
            <p className={styles.tasksDone}>Concluídas</p>
            <div
              className={styles.counter}
            >{`${checkedTasksCounter} de ${tasks.length}`}</div>
          </span>
        </header>
        {tasks.length > 0 ? (
          <div className={styles.tasksBody}>
            {tasks.map((task) => (
              <Item
                key={task.id}
                data={task}
                removeTask={handleRemoveTask}
                toggleTaskStatus={handleToggleTask}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyBody}>
            <ClipboardText size={60} weight="light"/>
            <b>Você ainda não tem tarefas cadastradas</b>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
