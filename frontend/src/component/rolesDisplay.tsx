import React from "react";
import RoleComponent from "./roleComponent";
import { dataType } from "../types/roleDataType";

const RolesDisplay: React.FC<dataType> = ({ roles }) => {
  console.log(roles);
  const parentRole = roles.filter((p) => !p.parentId);

  return (
    <div>
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
