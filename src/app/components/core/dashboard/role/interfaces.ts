export interface RoleData {
  result: string;
  data: RoleList[]
}

export interface RoleList {
  id: string;
  roleNane: string;
  details : {
    department : string;
    shift : string;
    subrole : string;
  };
  features : number;
  approvals : number;
}