import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";


export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);

  const response = await apiClient.get("/me");

  return {
    props: {},
  };
}, {
  //definindo parâmetros que o usuário deve ter para acessar a página
  permissions: ['metrics.list'],
  roles: ['administrator'],
});
