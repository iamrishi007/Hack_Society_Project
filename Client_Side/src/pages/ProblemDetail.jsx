import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleQuestion } from "../Api/questionApi";
import AceEditor from "react-ace";
import {
  Box,
  Button,
  Container,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const ProblemDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getSingleQuestion(id);
        setQuestion(data);
      } catch (err) {
        console.error("Error loading question:", err);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleRunCode = async () => {
    try {
      const res = await fetch("https://hacksociety-server.onrender.com/code/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language_id: 63, // 63 = JavaScript (Node.js)
          questionId: id,
        }),
      });

      const data = await res.json();
      setResult(data.status || data.output || "Unknown Result");

      toast({
        title: data.status === "Accepted" ? "✅ Accepted" : "❌ Failed",
        status: data.status === "Accepted" ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Run failed:", err);
      setResult("Error");
    }
  };

  const handleSubmitCode = () => {
    if (result === "Accepted") {
      toast({
        title: "🎉 Code Submitted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "🚫 Fix your code before submitting",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!question) return <Text color="white">Loading question...</Text>;

  return (
    <Box bg="black" minH="100vh" py={8} color="white">
      <Container maxW="container.lg">
        <VStack align="start" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {question.title}
          </Text>
          <Text>{question.description}</Text>

          <AceEditor
            mode="javascript"
            theme="monokai"
            name="code-editor"
            fontSize={16}
            width="100%"
            height="300px"
            value={code}
            onChange={(value) => setCode(value)}
            placeholder={`// Write your function here like:
function add(a, b) {
  return a + b;
}`}
            editorProps={{ $blockScrolling: true }}
          />

          <Box display="flex" gap={4}>
            <Button colorScheme="green" onClick={handleRunCode}>
              Run Code
            </Button>
            <Button colorScheme="blue" onClick={handleSubmitCode}>
              Submit Code
            </Button>
          </Box>

          {result && (
            <Text fontWeight="bold" fontSize="lg">
              Result: {result}
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default ProblemDetail;
