import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";
import { Task } from "./components/Task";

export default function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main className={styles.TaskList}>
          <Task/>
        </main>
      </div>
    </div>
  );
}
