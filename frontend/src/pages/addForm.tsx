import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

interface treeForm {
  map(arg0: (tree: any) => JSX.Element): import("react").ReactNode;
  name: string;
  description: string;
  names: string;
}

function AddForm() {
  const navigate = useNavigate();
  const [trees, setTrees] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<treeForm>({
    //  resolver: yupResolver<yup.AnyObject>(schema),
  });

  const getTrees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/treeStructure/allTrees/"
      );
      setTrees(response.data);
      //   console.log(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrees();
  }, []);

  const submitForm = async (data: treeForm) => {
    try {
      await axios.post(
        "http://localhost:5000/api/treeStructure/addTrees/",
        data
      );
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
          <select id="names" {...register("names")}>
            <option></option>
            {trees &&
              trees.map((tree: any) => (
                <option key={tree._id} value={tree._id}>
                  {tree.name}
                </option>
              ))}
          </select>
        </div>
        <Button
          type="submit"
          className="bg-black hover:bg-indigo-400 ml-5"
          radius="md"
          size="md"
        >
          submit
        </Button>
      </form>
    </div>
  );
}

export default AddForm;
