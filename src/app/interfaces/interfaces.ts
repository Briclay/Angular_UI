export interface BreadCrumb {
  label: string;
  url: string;
};

export interface User {
  email: string;
  uuid: string;
  homeProduct: string;
  profiles: string[];
}

export interface TableOptionHeader {
  title: string;
  type?: string;
  target?: string;
  disableSort?: boolean;
  iconType?: string;
  colorCode?: string;
  tooltip?: string;
}

export interface TableOptions {
  header: TableOptionHeader[];
  content: Array<any>;
  keys: string[];
}

export interface ChartData {
  name: string;
  color: string;
  values: { date: string; value: number }[];
}

export interface UserData {
  result: string;
  data: UserList[]
}

export interface UserList {
  name: {
    first: string;
    last: string
  };
  address: {
    flat: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: number
  };
  userType: string;
  profileImageUrl: string;
  deleteFlag: boolean;
  activeFlag: boolean;
  _id: string;
  _organisationId: {
    address: {
      area: string;
      city: string;
      state: string;
      pincode: number
    };
    orgType: string;
    plant: string[];
    logoImageUrl: string;
    description: string;
    _users: string[];
    _features: string[];
    _departments: string[];
    deleteFlag: boolean;
    activeFlag: boolean;
    _id: string;
    orgCode: string;
    name: string;
    email: string;
    phone: number;
    imageUrls: string[];
    _createdBy: string;
    _updatedBy: string;
    deleteNote: string;
    createdAt: string;
    updatedAt: string;
    __v: number
  };
  email: string;
  username: string;
  password: string;
  _roleId: {
    _id: string;
    name: string
  };
  phone: number;
  _createdBy?: {
    profileImageUrl: string;
    _id: string;
    displayName: string;
    email: string;
    username: string
  };
  createdAt?: string;
  devices?: string[];
  imageUrls?: string[];
  salt?: string;
  displayName?: string;
  __v?: number;
  lastLoginAt?: string;
  reviewPoints?: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  activateToken?: string;
  activateTokenExpires?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  deleteNote?: string;
  updatedAt?: string;
  deletedAt?: string;
  access?: string[];
  roles?: string[]
}

export interface OrganizationList {
  id: string;
  orgName: string;
  orgAddress: string;
    subsciption : {
      plan : string;
    };
    details : {
      email: string;
      Address : string
    };
    entities:{
      count : number | string;
      validtill : string
    }
}

export interface OrganizationData {
  data: OrganizationList[]
}

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
  approvals : number
}