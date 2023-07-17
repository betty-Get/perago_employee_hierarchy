import axios from "axios";
import { roleDataType } from "../types/roleDataType";

const roleServiceUrl = "http://localhost:5000/api/employee-role";

const getRoles = async () => {
  const response = await axios.get(`${roleServiceUrl}/`);
  return response.data;
};

const getRole = async (roleId: any) => {
  const response = await axios.get(`${roleServiceUrl}/${roleId}`);
  return response.data;
};

const addRoles = async (data: roleDataType) => {
  const response = await axios.post(`${roleServiceUrl}/`, data);
  return response.data;
};

const editRole = async (roleId: any, data: roleDataType) => {
  const response = await axios.patch(`${roleServiceUrl}/${roleId}`, data);
  return response.data;
};

const deleteRole = async (roleId: any) => {
  const response = await axios.delete(`${roleServiceUrl}/${roleId}`);
  return response.data;
};

export default {
  getRoles,
  getRole,
  addRoles,
  editRole,
  deleteRole,
};
