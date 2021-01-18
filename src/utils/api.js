import axios from "axios";
// https://phonebook-api-242.herokuapp.com/api
export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});
