import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    console.log(values)
  };

  return (
    <Flex
      w="100vw" //width
      h="100vh" //height
      align="center" //align-center
      justify="center" //justify-center
    >
      <Flex
        as="form"
        w="100%" //width
        maxWidth={360} //360px
        bg="gray.800"
        p="8" //padding 8(medida do chakra ui)
        borderRadius={8} //8px
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")} //setando ref no input
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")} //setando ref no input
          />
        </Stack>
        <Button
          type="submit"
          mt="6" //margin-top 6(medida do chakra ui)
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
