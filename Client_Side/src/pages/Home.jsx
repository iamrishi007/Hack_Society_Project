import { Box, Container, Heading, Image, Text, Flex, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Home = () => {
     return (

          <>


               <Box minH="110vh" bgColor="#121212" color={"white"}>

                    <Heading p={3} color={"teal"}>  Hack Society</Heading>
                    <Container maxW="full" p={0} centerContent>
                         <Box m="auto">
                              <Image
                                   m={10}
                                   h="200px"
                                   src="https://manojranaweera.me/wp-content/uploads/2016/08/ninja.gif"
                                   alt="Ninja"
                              />
                         </Box>

                         <Text fontSize="xl" fontWeight="bold" mb={3} textAlign={"center"}>
                              "Practice coding problems, sharpen your skills, and become a 🥷 coding ninja <br />


                              Join a growing community  🌍  of developers striving to become industry-ready !"
                         </Text>

                    </Container>

                    <Box mt={20} textAlign="center">
                         <Heading size="lg" color={"teal"} mb={6}>What You Can Do</Heading>
                         <Flex
                              direction={{ base: "column", md: "row" }}
                              justify="center"
                              align="center"
                              gap={10}
                              px={5}
                         >
                              <Box>
                                   <Heading size="md" color={"teal"} mb={2}>🧠 Solve Challenges</Heading>
                                   <Text color="gray.400">Practice DSA questions by topic or difficulty.</Text>
                              </Box>
                              <Box>
                                   <Heading size="md" color={"teal"} mb={2}>📈 Track Progress</Heading>
                                   <Text  color="gray.400"> View your submission history and monitor your growth.</Text>
                              </Box>
                              <Box>
                                   <Heading size="md" color={"teal"} mb={2}>⚡ Code Editor</Heading>
                                   <Text color="gray.400">Write, run, and submit code directly in the browser.</Text>
                              </Box>
                         </Flex>
                    </Box>
                    <Box m="20px auto" display="flex" justifyContent="center">
                         <Stack direction="row" spacing={5}>
                              <Button colorScheme="teal" as={Link} to="/register">
                                   Get Started
                              </Button>
                              <Button colorScheme="white" variant="outline" as={Link} to="/login">
                                   Login
                              </Button>
                         </Stack>
                    </Box>

               </Box>
          </>
     );
};

export default Home