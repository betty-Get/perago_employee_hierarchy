import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";

const FormComponent: React.FC<any> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<roleDataType>();

  return (
    <div>
      <form
        onSubmit={handleSubmit(props.submitForm)}
        className="bg-white w-[500px] mx-10 my-5 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="w-2/3 pl-3 pr-10 text-gray-500 font-bold md:text-right mb-1 md:mb-0 ">
          Name :
        </label>
        <input
          type="string"
          placeholder={props.role.name}
          className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
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
          <label className="w-1/3 pr-3 text-gray-500 font-bold md:text-right mb-1 md:mb-0">
            Description :
          </label>
          <input
            type="string"
            placeholder={props.role.description}
            className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
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
          {props.button}
        </Button>

        {props.editButton && (
          <Button
            type="submit"
            className="bg-black hover:bg-indigo-400 ml-5"
            radius="md"
            size="md"
          >
            {props.editButton}
          </Button>
        )}

        {props.deleteButton && (
          <span>
            <Button
              className="bg-black hover:bg-indigo-400 ml-5"
              radius="md"
              size="md"
              onClick={props.open}
            >
              {props.deleteButton}
            </Button>
          </span>
        )}
      </form>
    </div>
  );
};

export default FormComponent;
