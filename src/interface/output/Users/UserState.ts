import { UserInfo, UserList,UserRoles } from "./UsersList";

export interface UserListState {
    users: UserList[];
    isLoading: boolean;
    error: string | null;
    user_info: UserInfo | null;
    userInitialRoles: UserRoles[];
    roleList: UserRoles[];
  }