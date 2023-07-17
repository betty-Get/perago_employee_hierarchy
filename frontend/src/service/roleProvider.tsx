import axios from "axios";
import { roleDataType } from "../types/roleDataType";

const roleServiceUrl = "http://localhost:5000/api/employee-role";

const getRoles = async () => {
  const response = await axios.get(`${roleServiceUrl}/`);
  return response.data;
};
const addRoles = async (data: roleDataType) => {
  const response = await axios.post(`${roleServiceUrl}/`, data);
  return response.data;
};

export default {
  getRoles,
  addRoles,
};
