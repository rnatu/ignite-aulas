import { FormEvent, useContext, useState } from "react";
import styles from "../styles/Home.module.css";

import { AuthContext } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1>Efetue seu login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export const getServerSideProps = withSSRGuest<{ users: string[] }>(
  async (context) => {
    return {
      props: {
        users: ["asda", "hsadujsdh"],
      },
    };
  }
);
