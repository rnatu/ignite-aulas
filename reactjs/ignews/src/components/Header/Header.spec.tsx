import { render, screen } from "@testing-library/react";
import { Header } from "./index";

// mockando useRouter() que é utilizado dentro ActiveLink
jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

// mockando useSession() que é utilizado dentro SignInButton
// foi mockado retornando "configs" de usuário não logado -> null e false
jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false];
    }
  }
})

describe("Header component", () => {
  it("renders correctly", () => {
    render(
      <Header />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});