import Prismic from "@prismicio/client";

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    //endereço da aplicação no prismic
    process.env.PRISMIC_ENDPOINT,
    {
      //req é utilizado em serverSideProps
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  );

  return prismic;
}
