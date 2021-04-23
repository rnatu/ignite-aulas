import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return(
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
         <Text>Renato Xavier</Text>
         <Text color="gray.300" fontSize="small">
           rnatu91@gmail.com
         </Text>
       </Box>
      )}

    <Avatar size="md" name="Renato Xavier" src="https://github.com/rnatu.png"></Avatar>
  </Flex>
  );
}
