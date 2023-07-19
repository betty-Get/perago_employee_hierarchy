import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { roleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";
import { useSelector, useDispatch } from "react-redux";
import FormComponent from "../component/formComponent";
import { setRoleData } from "../service/roleReducer";

function EditEmployeeRole() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const params = useParams();
  const roles = useSelector((state: any) => state.roles.data);
  // const [error, setError] = useState(false);
  const dispacth = useDispatch();
  const [role, setRole] = useState<roleDataType>();
  // const role = roles.find((r: { _id: any }) => r._id === params.roleId);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<roleDataType>({
  //   defaultValues: role,
  // });

  const getRole = async () => {
    try {
      // if redux state not set, use dispatch to setData
      if (!roles) {
        const roleData = await roleProvider.getRoles();
        dispacth(setRoleData(roleData));
      }
      // find role to update by roleId from param
      const targetRole = roles.find(
        (r: { _id: any }) => r._id === params.roleId
      );

      // exit page if role not found
      if (!targetRole) {
        navigate("/");
      }
      setRole(targetRole);
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
    } catch (err) {
      console.log(err);
      // setError(err.response.data);
      // setTimeout(() => navigate("/"), 1000);
    }
  };

  const deleteRole = async () => {
    try {
      await roleProvider.deleteRole(params.roleId);
      return setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      console.log(err);
      // setError(err.response.data);
      // setTimeout(() => navigate("/"), 1000);
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

      {role && (
        <FormComponent
          submitMethod={editRole}
          action={"Edit"}
          role={role}
          openDeleteModal={open}
        />
      )}
    </div>
  );
}

export default EditEmployeeRole;
