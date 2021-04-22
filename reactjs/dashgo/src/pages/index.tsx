import { Flex, Button, Stack, } from "@chakra-ui/react";
import { Input } from '../components/Form/Input';

export default function SignIn() {
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
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail"/>
          <Input name="password" type="password" label="Senha"/>
        </Stack>
        <Button
          type="submit"
          mt="6" //margin-top 6(medida do chakra ui)
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
