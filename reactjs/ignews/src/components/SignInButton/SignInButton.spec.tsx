import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { SignInButton } from "./index";
import { useSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    //criando o mock de useSession
    const useSessionMocked = mocked(useSession);
    //mockando apenas o primeiro uso do useSession, que é no render(<SignInButton />); abaixo
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    //criando o mock de useSession
    const useSessionMocked = mocked(useSession);
    //mockando apenas o primeiro uso do useSession, que é no render(<SignInButton />); abaixo
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
