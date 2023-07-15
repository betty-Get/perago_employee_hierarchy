import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Button } from "@mantine/core";

// const schema = yup.object().Schema({
//   name: yup.string().required(),
//   description: yup.string().required(),
//   names: yup.string(),
// });
function AddForm() {
  const [trees, setTrees] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // } = useForm({ resolver: yupResolver(schema) });

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
  const submitForm = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <label>name</label>
        <input type="string" name="name" {...register("name")} />
        {/* {errors.name?.message} */}
        <label>description</label>
        <input type="string" name="description" {...register("description")} />
        {/* {errors.description?.message} */}

        <select name="names" id="names" {...register("names")}>
          <option></option>
          {trees &&
            trees.map((tree) => (
              <>
                <option value={tree._id}>{tree.name}</option>
              </>
            ))}
        </select>

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
