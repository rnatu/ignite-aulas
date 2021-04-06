import Head from 'next/head';
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn workspaces</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque pariatur quia obcaecati illo, libero dignissimos optio consequuntur assumenda itaque ut beatae totam ad nam odio porro debitis? Corporis, sequi impedit.</p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn workspaces</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque pariatur quia obcaecati illo, libero dignissimos optio consequuntur assumenda itaque ut beatae totam ad nam odio porro debitis? Corporis, sequi impedit.</p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn workspaces</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque pariatur quia obcaecati illo, libero dignissimos optio consequuntur assumenda itaque ut beatae totam ad nam odio porro debitis? Corporis, sequi impedit.</p>
          </a>
        </div>
      </main>
    </>
  );
}
