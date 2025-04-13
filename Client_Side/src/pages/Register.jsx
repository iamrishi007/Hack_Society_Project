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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !pass || !age) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all the fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/user/register", // Ensure backend is running
        {
          name,
          email,
          password: pass,
          age,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is successful (status 200-299)
      if (res.status >= 200 && res.status < 300) {
        console.log(res.data);

        toast({
          title: "Signup Successful 🎉",
          description: "You can now login with your credentials.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/login"); // Redirect to the correct login page after signup
      } else {
        // Handle non-2xx response from server
        toast({
          title: "Signup Failed",
          description: "Something went wrong during registration.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("Signup Error ❌", err);

      toast({
        title: "Signup Failed",
        description:
          err.response?.data?.message || "Something went wrong during registration.",
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
      bg="black"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={10}
    >
      <Container
        maxW="md"
        bg="#1A202C"
        borderRadius="2xl"
        boxShadow="2xl"
        py={10}
        px={[6, 8]}
      >
        <Heading
          textAlign="center"
          mb={6}
          fontSize="2xl"
          color="teal.300"
          fontWeight="bold"
        >
          Create Your Account 📝
        </Heading>

        <VStack spacing={5}>
          <Input
            placeholder="Enter your name"
            size="md"
            focusBorderColor="teal.400"
            borderRadius="xl"
            value={name}
            color="white"
            onChange={(e) => setName(e.target.value)}
            bg="gray.700"
            _placeholder={{ color: "gray.400" }}
          />

          <Input
            placeholder="Enter your email"
            size="md"
            focusBorderColor="teal.400"
            borderRadius="xl"
            value={email}
            color="white"
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.700"
            _placeholder={{ color: "gray.400" }}
          />

          <Input
            placeholder="Enter your password"
            type="password"
            size="md"
            focusBorderColor="teal.400"
            borderRadius="xl"
            value={pass}
            color="white"
            onChange={(e) => setPass(e.target.value)}
            bg="gray.700"
            _placeholder={{ color: "gray.400" }}
          />

          <Input
            placeholder="Enter your age"
            type="number"
            size="md"
            focusBorderColor="teal.400"
            borderRadius="xl"
            value={age}
            color="white"
            onChange={(e) => setAge(e.target.value)}
            bg="gray.700"
            _placeholder={{ color: "gray.400" }}
          />

          <Button
            width="100%"
            colorScheme="teal"
            size="md"
            borderRadius="xl"
            onClick={handleSignup}
            isLoading={loading}
            _hover={{ bg: "teal.500" }}
          >
            Sign Up
          </Button>

          <Text fontSize="sm" color="gray.400">
            Already have an account?{" "}
            <Text
              as="span"
              color="teal.300"
              fontWeight="medium"
              cursor="pointer"
            >
              <Link to={"/login"}>Login</Link>
            </Text>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Register;
