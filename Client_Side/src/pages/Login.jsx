import {
     Box,
     Button,
     Container,
     Heading,
     Input,
     VStack,
     useToast,
     Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
     const [email, setEmail] = useState("");
     const [pass, setPass] = useState("");
     const [loading, setLoading] = useState(false);
     const toast = useToast();
     const navigate = useNavigate();

     // Redirect if user is already logged in
     useEffect(() => {
          if (localStorage.getItem("token")) {
               navigate("/problems");
          }
     }, [navigate]);

     const handleLogin = async () => {
          if (!email || !pass) {
               toast({
                    title: "Missing Fields",
                    description: "Please enter both email and password.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
               });
               return;
          }

          setLoading(true);

          try {
               const response = await axios.post(
                    "https://hacksociety-server.onrender.com/user/login",
                    {
                         email,
                         password: pass,
                    },
                    {
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );

               const { token, user } = response.data;
               console.log(response.data); 

               if (token) {
                    localStorage.setItem("token", token); 

                    toast({
                         title: "Login Successful 🎉",
                         description: `Welcome ${user.name}`,
                         status: "success",
                         duration: 3000,
                         isClosable: true,
                    });

                    navigate("/problems"); 
               } else {
                    toast({
                         title: "Login Error",
                         description: "Token not received from server.",
                         status: "error",
                         duration: 3000,
                         isClosable: true,
                    });
               }
          } catch (error) {
               console.log("Login Error ❌", error);

               toast({
                    title: "Login Failed",
                    description:
                         error.response?.data?.message || "Invalid email or password.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
               });
          } finally {
               setLoading(false);
          }
     };

     return (
          <Box
               minH="100vh"
               bg="black"
               color="white"
               display="flex"
               alignItems="center"
               justifyContent="center"
               px={4}
               py={10}
          >
               <Container maxW="md" bg="gray.900" borderRadius="2xl" boxShadow="2xl" py={10} px={8}>
                    <Heading textAlign="center" mb={6} fontSize="2xl" color="teal.300" fontWeight="bold">
                         Welcome Back 👋
                    </Heading>

                    <VStack spacing={5}>
                         <Input
                              placeholder="Enter your email"
                              size="md"
                              focusBorderColor="teal.400"
                              borderRadius="xl"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              bg="gray.800"
                              color="white"
                         />

                         <Input
                              placeholder="Enter your password"
                              type="password"
                              size="md"
                              focusBorderColor="teal.400"
                              borderRadius="xl"
                              value={pass}
                              onChange={(e) => setPass(e.target.value)}
                              bg="gray.800"
                              color="white"
                         />

                         <Button
                              width="100%"
                              colorScheme="teal"
                              size="md"
                              borderRadius="xl"
                              onClick={handleLogin}
                              isLoading={loading}
                              _hover={{ bg: "teal.500" }}
                         >
                              Log In
                         </Button>

                         <Text fontSize="sm" color="gray.400">
                              Don&apos;t have an account?{" "}
                              <Text as="span" color="teal.300" fontWeight="medium">
                                   <Link to={"/register"}>Signup</Link>
                              </Text>
                         </Text>
                    </VStack>
               </Container>
          </Box>
     );
};

export default Login;
