import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/client";
import Head from 'next/head';
import Link from "next/link";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import router from 'next/router'

import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

//props post, sendo recebida da getStaticProps
export default function PostPreview({ post }: PostPreviewProps) {
  const [ session ] = useSession();

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  },[session])

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html:post.content }}
          />
        </article>

        <div className={styles.continueReading}>
          Wanna continue reading?
          <Link href="/">
            <a>Subscribe now 🤗</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

// Foi utilizado getStaticProps, pois essa página sera pública para todos do site
// Não precisa ser verificado em todo acesso informações de assinantes
// getStaticProps não utiliza req nos props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  //prismic.io CMS Headless
  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    //splice, para pegar apenas os 3 primeiros blocos de conteúdo
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  }
}
