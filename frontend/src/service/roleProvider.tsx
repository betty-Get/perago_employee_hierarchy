import axios from "axios";
import { RoleDataType } from "../types/roleDataType";
import * as mockService from "./mockService";

const roleServiceUrl = "http://localhost:5000/api/employee-role";
const mockEnabled = false;

const getRoles = async () => {
  if (mockEnabled) return mockService.getRoles();
  else {
    const response = await axios.get(`${roleServiceUrl}/`);
    return response.data;
  }
};

const getRole = async (roleId: any) => {
  if (mockEnabled) return mockService.getRoles();
  else {
    const response = await axios.get(`${roleServiceUrl}/${roleId}`);
    return response.data;
  }
};

const addRoles = async (data: RoleDataType) => {
  if (mockEnabled) return mockService.getRoles();
  else {
    const response = await axios.post(`${roleServiceUrl}/`, data);
    return response.data;
  }
};

const editRole = async (roleId: any, data: RoleDataType) => {
  if (mockEnabled) return mockService.getRoles();
  else {
    const response = await axios.patch(`${roleServiceUrl}/${roleId}`, data);
    return response.data;
  }
};

const deleteRole = async (roleId: any) => {
  if (mockEnabled) return mockService.getRoles();
  else {
    const response = await axios.delete(`${roleServiceUrl}/${roleId}`);
    return response.data;
  }
};

export default {
  getRoles,
  getRole,
  addRoles,
  editRole,
  deleteRole,
};
