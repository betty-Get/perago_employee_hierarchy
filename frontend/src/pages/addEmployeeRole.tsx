import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";
import { useSelector } from "react-redux";
import FormComponent from "../component/formComponent";

function AddEmployeeRole() {
  const navigate = useNavigate();
  const params = useParams();
  const parentId: string = String(params.parentId);
  const [parentRole, setParentRole] = useState<roleDataType>();
  const [error, setError] = useState(false);
  const roles = useSelector((state: any) => state.roles.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<roleDataType>();

  const getParentRole = async () => {
    try {
      if (parentId && parentId != "parent") {
        const role = roles.find((r: { _id: any }) => r._id === parentId);
        if (role._id !== parentId) {
          return navigate("/");
        }
        setParentRole(role);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParentRole();
  }, []);

  const submitForm = async (data: roleDataType) => {
    try {
      if (parentId != "parent") {
        data.parentId = parentId;
      }
      const response = await roleProvider.addRoles(data);
      alert("data added");
      navigate("/");
    } catch (err: any) {
      console.log(err);
      // setError(err.response.data);
      // setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <div className="mt-10 mx-14">
      <p className="text-[25px] font-serif text-lime-600 ml-9">
        Add Role -- <span>{parentRole && parentRole.name}</span>
      </p>

      <FormComponent submitForm={submitForm} button={"Submit"} />
    </div>
  );
}

export default AddEmployeeRole;
