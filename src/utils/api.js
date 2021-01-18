import axios from "axios";
export default axios.create({
  baseURL: "https://phonebook-api-242.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
