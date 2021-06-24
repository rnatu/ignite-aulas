import Posts, { getStaticProps } from "../../pages/posts";
import { render, screen } from "@testing-library/react";

import { getPrismicClient } from "../../services/prismic";
import { mocked } from "ts-jest/utils";

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "10 de abril",
  },
];

describe("Posts page", () => {
  it("render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    //mockando o uso da importação
    const getPrismicClientMocked = mocked(getPrismicClient);

    //mockando o retorno da função getPrismicClientMocked.query
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
      //mockando somente a função query, e para não exibir erro é utilizado o 'as any'
    } as any);

    const response = await getStaticProps({})
    // console.log(response)
    // console.log(response.props)

    expect(response).toEqual(expect.objectContaining({
      props: {
        posts: [
          {
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }
        ]
      }
    }))
  });
});
