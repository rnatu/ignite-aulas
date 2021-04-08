import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import Head from 'next/head';
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {

  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html:post.content }}
          />
        </article>
      </main>
    </>
  );
}

// não foi utilizado getStaticProps, pois toda página estática é publica e não protegida
// e essa página para ser exibida inteira, precisa de usuário logado e assinante do plano
// e precisa ser verificado em todo acesso essas informações
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({req});
  const { slug } = params

  //yarn add -D @types/next-auth@3.7.1
  //reload no vscode caso o activeSubscription esteja dando erro no typeScript
  //activeSubscription setado no /auth/[...nextauth].ts
  if(!session?.activeSubscription) {
    //redirecionando caso não tenha uma subscription ativa pelo getServerSideProps
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  //prismic.io CMS Headless
  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post,
    }
  }
}
