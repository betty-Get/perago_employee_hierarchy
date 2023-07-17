import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";

function EditEmployeeRole() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const params = useParams();
  const [role, setRole] = useState<roleDataType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<roleDataType>({
    defaultValues: role,
  });

  const getRole = async () => {
    try {
      const response = await roleProvider.getRole(params.roleId);
      setRole(response);
      reset(response);
      // console.log(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRole();
  }, [reset]);

  const editRole = async (data: roleDataType) => {
    try {
      console.log(data);
      await await roleProvider.editRole(params.roleId, data);
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
    <div>
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <button onClick={deleteRole}>Yes</button>
        <button onClick={close}>No</button>
      </Modal>

      <form
        onSubmit={handleSubmit(editRole)}
        className="bg-white w-[500px] mx-10 my-10 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="pr-3">name</label>
        <input
          type="string"
          // value={role.name}
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
              minLength: 6,
              maxLength: 30,
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
