import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

interface roleDataType {
  name: string;
  description: string;
}

function EditEmployeeRole() {
  const navigate = useNavigate();
  const params = useParams();
  // const [roles, setRoles] = useState<roleDataType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<roleDataType>({
    //  resolver: yupResolver<yup.AnyObject>(schema),
  });

  // const getRoles = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/treeStructure/allTrees/"
  //     );
  //     setRoles(response.data);
  //     //   console.log(response.data);
  //     return;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getRoles();
  // }, []);

  const editRole = async (data: roleDataType) => {
    try {
      console.log(data);
      await axios.patch(
        `http://localhost:5000/api/treeStructure/updateEmployeeRole/${params.roleId}`,
        data
      );
      alert("data updated");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(editRole)}
        className="bg-white w-[500px] mx-10 my-10 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="pr-3">name</label>
        <input
          type="string"
          // value={roles.name}
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
      </form>
    </div>
  );
}

export default EditEmployeeRole;
