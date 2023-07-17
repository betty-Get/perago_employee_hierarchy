import axios from "axios";

const roleServiceUrl = "http://localhost:5000/api/employee-role";

const getRoles = async () => {
  const response = await axios.get(`${roleServiceUrl}/`);
  return response.data;
};

export default {
  getRoles,
};
