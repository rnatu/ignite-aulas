import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("render correctly", () => {
    render(<Async />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("render button text correctly", async () => {
    render(<Async />);
    //% findByText
    /* o findByText espera um tempo  (padrão pelo jest 1segundo, pode ser alterado passando um objeto de configurações) pelo texto aparecer,
    retornando uma promise, por isso é necessário o uso do async await neste caso */
    expect(await screen.findByText("Button 1")).toBeInTheDocument();
  });

  it("render button text correctly", async () => {
    render(<Async />);
    //% waitFor
    /* o waitFor espera um tempo (padrão pelo jest 1segundo, pode ser alterado passando um objeto de configurações) pelo texto aparecer,
    retornando uma promise, por isso é necessário o uso do async await neste caso */
    await waitFor(async () => {
      return expect(screen.getByText("Button 1")).toBeInTheDocument();
    });

    await waitFor(async () => {
      return expect(screen.queryByText("Button 2")).not.toBeInTheDocument();
    });
  });
});
