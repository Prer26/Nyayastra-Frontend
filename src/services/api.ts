// src/services/api.ts

import axios from "axios";

const API = axios.create({
  baseURL:
    "https://nyayastra-backend-1.onrender.com/",
});

export const sendMessageToAI =
  async (
    message: string,
    language: string
  ) => {

    const response =
      await API.post(
        "/chat",
        {
          message,
          language,
        }
      );

    return response.data.data;
};