import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../Api/questionApi";
import { Link as RouterLink } from "react-router-dom";
import { Box, Heading, List, ListItem, Link, Spinner, HStack, Select, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
const ProblemsPage = () => {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const navigate = useNavigate();
  const chapters = ["Two Pointers", "LinkedList", "Graphs", "Trees", "Arrays", "Strings"];
  const difficulties = ["Easy", "Medium", "Hard"];


  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions()
        setQuestions(data)
        setFilteredQuestions(data)
      } catch (error) {
        console.error("Error fetching questions:", error)
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions()
  }, []);


  const handleFilter = () => {
    let filtered = [...questions];


    if (selectedChapter) {
      filtered = filtered.filter(
        (question) => question.chapter.trim().toLowerCase() === selectedChapter.trim().toLowerCase()
      );
    }


    if (selectedDifficulty) {
      filtered = filtered.filter(
        (question) => question.difficulty.trim().toLowerCase() === selectedDifficulty.trim().toLowerCase()
      );
    }

    setFilteredQuestions(filtered);
  };


  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };


  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };


  useEffect(() => {
    handleFilter();
  }, [selectedChapter, selectedDifficulty]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      backgroundColor="black"
      color="white"
      minHeight="100vh"
      padding="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="100%" display="flex" justifyContent="flex-end" mb={4}>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Heading as="h1" size="2xl" marginBottom="6">
        All Questions
      </Heading>


      <HStack spacing={4} marginBottom="4">
        <Select
          placeholder="Select Chapter"
          value={selectedChapter}
          onChange={handleChapterChange}
          width="200px"
          bgColor="gray.600"
          color="black"
        >
          {chapters.map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Select Difficulty"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
          width="200px"
          bgColor="gray.600"
          color="black"
        >
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </Select>
      </HStack>


      {filteredQuestions.length === 0 && (
        <Text fontSize="lg" color="gray.400">
          No questions found with the selected filters.
        </Text>
      )}


      <List spacing={3} textAlign="center">
        {filteredQuestions.map((question) => (
          <ListItem key={question._id}>
            <Link
              as={RouterLink}
              to={`/problems/${question._id}`}
              fontSize="xl"
              color="teal.300"
              _hover={{ color: "pink.400", textDecoration: "underline" }}
            >
              {question.title}
            </Link>
          </ListItem>
        ))}
      </List>

    </Box>

  );
};

export default ProblemsPage;
