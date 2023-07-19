import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoleDataType } from "../types/roleDataType";
import roleProvider from "../service/roleProvider";
import { useSelector, useDispatch } from "react-redux";
import FormComponent from "../component/formComponent";
import { setRoleData } from "../service/roleReducer";

function AddEmployeeRole() {
  const navigate = useNavigate();
  const params = useParams();
  const parentId: string = String(params.parentId);
  const [parentRole, setParentRole] = useState<RoleDataType>();
  const [success, setSuccess] = useState(false);
  const roles = useSelector((state: any) => state.roles.data);
  const dispacth = useDispatch();

  const getParentRole = async () => {
    try {
      // if redux state not set, use dispatch to setData
      if (!roles) {
        const roleData = await roleProvider.getRoles();
        dispacth(setRoleData(roleData));
      }

      if (parentId && parentId != "parent") {
        const role = roles.find((r: any) => r._id === parentId);
        if (!role) {
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

  const submitForm = async (data: RoleDataType) => {
    try {
      if (parentId != "parent") {
        data.parentId = parentId;
      }
      await roleProvider.addRoles(data);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  return (
    <div className="mt-10 mx-14">
      {!success && (
        <p className="text-[25px] ease-in-out font-serif text-lime-600 ml-9">
          Add Role<span>{parentRole && `-- ${parentRole.name}`}</span>
        </p>
      )}
      <FormComponent
        submitMethod={submitForm}
        button={"Submit"}
        action={"add"}
        success={success}
        successMsg={"Role Added SucessFully"}
      />
    </div>
  );
}

export default AddEmployeeRole;
