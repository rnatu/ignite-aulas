import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import "./global.css";
import styles from "./App.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "http://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @ Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "👉 jane.design/doctorcare" },
      { type: "hashTag", content: "#novoprojeto" },
      { type: "hashTag", content: "#nlw" },
      { type: "hashTag", content: "#rocketseat" },
    ],
    publishedAt: new Date("2022-05-03 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "http://github.com/rnatu.png",
      name: "Renato Xavier",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Salve Guys!" },
      {
        type: "paragraph",
        content: "Estou reforçando fundamentos de ReactJS 😁",
      },
      { type: "link", content: "👉 jane.design/doctorcare" },
      { type: "hashTag", content: "#rocketseat" },
      { type: "hashTag", content: "#reactJS" },
    ],
    publishedAt: new Date("2022-06-29 16:10:00"),
  },
];

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
