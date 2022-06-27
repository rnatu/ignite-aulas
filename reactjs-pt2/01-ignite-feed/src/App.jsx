import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import "./global.css";
import styles from "./App.module.css";
import { Post } from "./components/Post";

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          <Post
            author="Renato Xavier"
            content="lorem ipsum dolor sit amet, consectetur adip"
          />
          <Post
            author="Caroline Fernandes"
            content="lorem ipsum dolor sit amet, consectetur adip sit amet"
          />
        </main>
      </div>
    </>
  );
}

export default App;
