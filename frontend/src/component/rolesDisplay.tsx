import React from "react";
import RoleComponent from "./roleComponent";

interface roles {
  map(arg0: (role: any) => JSX.Element): import("react").ReactNode;
  parentId?: string;
  _id: string;
  name: string;
}
interface treesProps {
  roles: roles[];
}

const RolesDisplay: React.FC<treesProps> = ({ roles }) => {
  console.log(roles);
  const parentRole = roles.filter((p) => !p.parentId);

  // roles.map((role) => {
  //   if (!role.parentId) {
  //     console.log(role.name);
  //     roles.filter((child) => {
  //       if (child.parentId === role._id) {
  //         console.log(child.name);
  //         roles.filter((c) => {
  //           if (c.parentId === child._id) {
  //             console.log(c.name);
  //           }
  //         });
  //       }
  //     });
  //   }
  // });

  return (
    <div>
      {parentRole.map((parent: any) => {
        return (
          <RoleComponent
            // orignId={parent[0]}
            _id={parent["_id"]}
            name={parent["name"]}
            child={roles.filter((k: any) => k["parentId"] == parent["_id"])}
          />
        );
      })}
    </div>
  );
};

export default RolesDisplay;
