import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";

function AddEmployeeRole() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<roleDataType>();

  const getRoles = async () => {
    try {
      const response = await roleProvider.getRoles();
      setRoles(response);
      //   console.log(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const submitForm = async (data: roleDataType) => {
    try {
      console.log(data);
      await roleProvider.addRoles(data);
      alert("data added");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-white w-[500px] mx-10 my-10 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="pr-3">name</label>
        <input
          type="string"
          className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("name", { required: true, minLength: 3, maxLength: 20 })}
        />
        <p className="block text-red-600 font-[13px]">{errors.name?.message}</p>

        <div className="block my-5">
          <label className="pr-3">description</label>
          <input
            type="string"
            className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("description", {
              required: true,
              minLength: 6,
              maxLength: 30,
            })}
          />
          <p className="block text-red-600 font-[13px]">
            {errors.description?.message}
          </p>
        </div>

        <div className="block mb-3">
          <label className="pr-3">select parent</label>
          <select id="parentId" {...register("parentId")}>
            <option></option>
            {roles &&
              roles.map((role: any) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>
        <Button
          type="submit"
          className=" hover:text-slate-700 hover:bg-white ml-5 text-lime-700 text-[25px] font-serif font-semibold"
          radius="md"
          size="md"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddEmployeeRole;
