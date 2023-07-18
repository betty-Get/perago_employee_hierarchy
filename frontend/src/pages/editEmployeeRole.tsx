import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";
import { useSelector } from "react-redux";

function EditEmployeeRole() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const params = useParams();
  const roles = useSelector((state: any) => state.roles.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<roleDataType>({});

  const getRole = async () => {
    try {
      const role = roles.find((r: { _id: any }) => r._id === params.roleId);
      if (!role) {
        navigate("/");
      }
      reset(role);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  const editRole = async (data: roleDataType) => {
    try {
      await roleProvider.editRole(params.roleId, data);
      alert("data updated");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRole = async () => {
    console.log(`inside delete role ${params.roleId}`);
    try {
      await roleProvider.deleteRole(params.roleId);
      return setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 mx-14">
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <button onClick={deleteRole} className="p-3">
          Yes
        </button>
        <button onClick={close} className="p-3">
          No
        </button>
      </Modal>

      <p className="text-[25px] font-serif text-lime-600 ml-9">
        Edit or Delete Role
      </p>

      <form
        onSubmit={handleSubmit(editRole)}
        className="bg-white w-[500px] mx-10 my-5 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="w-2/3 pl-3 pr-10 text-gray-500 font-bold md:text-right mb-1 md:mb-0 ">
          Name :
        </label>
        <input
          type="string"
          className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
          {...register("name", {
            required: true,
            minLength: {
              value: 2,
              message: "This input requires min Length 2.",
            },
            maxLength: { value: 20, message: "This input exceed maxLength." },
          })}
        />
        <p className="block text-red-600 font-[13px]">{errors.name?.message}</p>

        <div className="block my-5">
          <label className="w-1/3 pr-3 text-gray-500 font-bold md:text-right mb-1 md:mb-0">
            Description :
          </label>
          <input
            type="string"
            className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            {...register("description", {
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
          className="bg-black hover:bg-indigo-400 ml-5"
          radius="md"
          size="md"
        >
          Edit
        </Button>

        <span>
          {" "}
          <Button
            className="bg-black hover:bg-indigo-400 ml-5"
            radius="md"
            size="md"
            onClick={open}
          >
            delete
          </Button>
        </span>
      </form>
    </div>
  );
}

export default EditEmployeeRole;
