import { CirclePlus, ClipboardList } from "lucide-react";
import styles from "./Task.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { ItemTask } from "./ItemTask";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      content: newTaskText,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const taskWithoutDeleteOne = tasks.filter((task) => {
      return task.id !== taskToDelete;
    });

    setTasks(taskWithoutDeleteOne);
  }

  function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted } : task
    );
    setTasks(updatedTasks);
  }

  const isNewTaskEmpty = newTaskText.length === 0;
  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <article className={styles.SearchTaskForm}>
      <form onSubmit={handleCreateNewTask}>
        <textarea
          name="tasks"
          value={newTaskText}
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          required
        />
        <footer>
          <button type="submit" disabled={isNewTaskEmpty}>
            <span>Criar</span>
            <CirclePlus size={16} />
          </button>
        </footer>
      </form>
      <div className={styles.title}>
        <div className={styles.taskCreated}>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.taskCompleted}>
          <p>Concluídas</p>
          <span>
            {completedTasksCount} de {tasks.length}
          </span>
        </div>
      </div>
      <div className={styles.TaskList}>
        {tasks.length !== 0 ? (
          tasks.map((task) => {
            return (
              <ItemTask
                key={task.id}
                id={task.id}
                content={task.content}
                onToggleTaskCompletion={toggleTaskCompletion}
                onDeleteTask={deleteTask}
              />
            );
          })
        ) : (
          <div className={styles.TaskListVoid}>
            <ClipboardList size={70} strokeWidth={1} />
            <h1>Você ainda não tem tarefas cadastradas</h1>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </div>
    </article>
  );
}
