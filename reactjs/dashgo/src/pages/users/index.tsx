import { Box, Spinner, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, {
      //tempo que o dado permanecerá "fresh"
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }

  return(
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner
                  ml="4"
                  size="sm"
                  color="gray.500"
                />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="16"/>}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
          <>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink"/>
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.users.map(user => (
                <Tr key={user.id}>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink"/>
                </Td>
                <Td>
                  <Box>
                    <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                      <Text fontWeight="bold">{user.name}</Text>
                    </Link>
                    <Text fontSize="small" color="gray.300">{user.email}</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>
                  {user.createdAt}
                </Td>}
              </Tr>
              ))}
            </Tbody>
          </Table>

          <Pagination
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            //prop drilling
            onPageChange={setPage}
          />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
