import { render } from "@testing-library/react";
import { ActiveLink } from "./index";

// "mockando" o uso do import no componente, simulando seu funcionamento
jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

//o describe categoriza em um grupo os testes realizados
describe("ActiveLink component", () => {
  it("renders correctly", () => {
    /* o render irá renderizar de forma "virtual", de modo que podemos
  observar o output de um componente */
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    //debug funciona como um console.log no terminal, mostrando o html virtual do trecho
    // debug()

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently active", () => {
    /* o render irá renderizar de forma "virtual", de modo que podemos
  observar o output de um componente */
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
