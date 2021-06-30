import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("render correctly", () => {
    render(<Async />);

    //% getByText
    /* o getByText procura de forma síncrona pelo texto,
    retornando o HTMLElement, por isso não é necessário o uso do async await neste caso */
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("button visibilities are working", async () => {
    render(<Async />);

    //% findByText
    /* o findByText espera um tempo (padrão pelo jest 1segundo, pode ser alterado passando um objeto de configurações) até o texto aparecer,
    retornando uma promise, por isso é necessário o uso do async await neste caso */
    expect(await screen.findByText("Button 2")).toBeInTheDocument();

    //% waitFor
    /* o waitFor espera um tempo (padrão pelo jest 1segundo, pode ser alterado passando um objeto de configurações) até o texto aparecer,
    retornando uma promise, por isso é necessário o uso do async await neste caso */
    await waitFor(() => {
      return expect(screen.queryByText("Button 1")).toBeInTheDocument();
    });

    await waitFor(() => {
      return expect(screen.queryByText("Button 2")).not.toBeInTheDocument();
    });
  });
});
