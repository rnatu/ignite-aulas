import { useSelector } from "react-redux";

export function Catalog() {
  const email = useSelector(state => state.email);

  console.log(email)

  return <h1>Catalog</h1>;
}
