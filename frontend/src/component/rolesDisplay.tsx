import React from "react";
import RoleComponent from "./roleComponent";
import { useNavigate } from "react-router-dom";
import { dataType } from "../types/roleDataType";
import { Button } from "@mantine/core";

const RolesDisplay: React.FC<dataType> = ({ roles }) => {
  const navigate = useNavigate();
  console.log(roles);
  const parentRole = roles.filter((p) => !p.parentId);

  return (
    <div>
      {parentRole && (
        <div className="my-3 ml-9">
          <Button
            className="text-white bg-slate-600 hover:bg-slate-500 text-[18px] "
            radius="md"
            size="md"
            onClick={() => navigate("/addEmployeeRole/parent")}
          >
            Add
          </Button>
        </div>
      )}
      {parentRole.map((parent: any) => {
        return (
          <RoleComponent
            _id={parent["_id"]}
            name={parent["name"]}
            child={roles.filter((c: any) => c["parentId"] == parent["_id"])}
          />
        );
      })}
    </div>
  );
};

export default RolesDisplay;
