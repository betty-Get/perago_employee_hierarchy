import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";
import { useSelector } from "react-redux";

function AddEmployeeRole() {
  const navigate = useNavigate();
  const params = useParams();
  const parentId: string = String(params.parentId);
  const [parentRole, setParentRole] = useState<roleDataType>();
  const roles = useSelector((state: any) => state.roles.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<roleDataType>();

  const getRole = async () => {
    try {
      if (parentId && parentId != "parent") {
        const role = roles.find((r: { _id: any }) => r._id === parentId);
        if (!role) {
          navigate("/");
        }
        setParentRole(role);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  const submitForm = async (data: roleDataType) => {
    try {
      if (parentId != "parent") {
        data.parentId = parentId;
      }
      await roleProvider.addRoles(data);
      alert("data added");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-5 mx-14">
      <p className="text-[25px] font-serif text-lime-600 ml-9">
        Add Role -- <span>{parentRole && parentRole.name}</span>
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-white w-[500px] mx-10 my-5 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="pr-3">name</label>
        <input
          type="string"
          className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("name", {
            required: "This is required.",
            minLength: {
              value: 2,
              message: "This input requires min Length 2.",
            },
            maxLength: { value: 20, message: "This input exceed maxLength." },
          })}
        />
        <p className="block text-red-600 font-[13px]">{errors.name?.message}</p>

        <div className="block my-5">
          <label className="pr-3">description</label>
          <input
            type="string"
            className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("description", {
              required: "This is required.",
              minLength: {
                value: 6,
                message: "This input requires min Length 2.",
              },
              maxLength: { value: 30, message: "This input exceed maxLength." },
            })}
          />
          <p className="block text-red-600 font-[13px]">
            {errors.description?.message}
          </p>
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
