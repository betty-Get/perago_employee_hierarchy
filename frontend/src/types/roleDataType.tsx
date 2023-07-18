export interface roleDataType {
  map(arg0: (tree: any) => JSX.Element): import("react").ReactNode;
  _id: string;
  name: string;
  description: string;
  parentId: string;
}

export interface dataType {
  roles: roleDataType[];
}
