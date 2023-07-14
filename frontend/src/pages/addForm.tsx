import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// const schema = yup.object().Schema({
//   name: yup.string().required(),
//   description: yup.string().required(),
// });
function AddForm() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(schema) });
  // const onSubmit = (data) => console.log(data);

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <label>name</label>
        <input type="string" name="name" {...register("name")} />
        {errors.name?.message}
        <label>description</label>
        <input type="string" name="description" {...register("description")} />
        {errors.description?.message}
        
        <Button></Button>
      </form> */}
    </div>
  );
}

export default AddForm;
