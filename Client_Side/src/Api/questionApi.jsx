// src/Api/questionApi.jsx
import axios from "axios";

const BASE_URL = "https://hacksociety-server.onrender.com"; // Or your backend URL

export const getAllQuestions = async () => {
  const res = await axios.get(`${BASE_URL}/questions`);
  return res.data;
};

export const getSingleQuestion = async (id) => {
  const res = await axios.get(`${BASE_URL}/questions/${id}`);
  return res.data;
};
