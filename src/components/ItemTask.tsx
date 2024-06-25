import { Trash2 } from "lucide-react";
import styles from "./ItemTask.module.css";
import { useState } from "react";

interface ItemTaskProps {
  id: string;
  content: string;
  onDeleteTask: (task: string) => void;
  onToggleTaskCompletion: (taskId: string, isCompleted: boolean) => void;
}

export function ItemTask({
  id,
  content,
  onDeleteTask,
  onToggleTaskCompletion,
}: ItemTaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  const handleCheckboxChange = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onToggleTaskCompletion(id, newIsChecked);
  };

  return (
    <div className={styles.Task}>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`checkbox-${id}`}></label>
      <div className={styles.TaskContent}>
        <p>{content}</p>
      </div>
      <button onClick={handleDeleteTask}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}
