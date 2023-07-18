import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";
import { useSelector } from "react-redux";
import FormComponent from "../component/formComponent";

function EditEmployeeRole() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const params = useParams();
  const roles = useSelector((state: any) => state.roles.data);

  const role = roles.find((r: { _id: any }) => r._id === params.roleId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<roleDataType>({
    defaultValues: role,
  });

  const getRole = async () => {
    try {
      if (!role) {
        navigate("/");
      }
      // reset(role);
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
        <button onClick={deleteRole} className="p-4 pr-9 text-red-700">
          Yes
        </button>
        <button onClick={close} className=" text-green-700">
          No
        </button>
      </Modal>

      <p className="text-[25px] font-serif text-lime-600 ml-9">
        Edit or Delete Role
      </p>

      <FormComponent
        submitForm={editRole}
        editButton={"Edit"}
        deleteButton={"Delete"}
        open={open}
        role={role}
      />
    </div>
  );
}

export default EditEmployeeRole;
