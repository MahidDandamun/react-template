export interface UserList extends UserInfo {

}

export interface UserRoles {
    name: string;
    role: string;
}

export interface UserInfo {
    email: string | null;
    first_name: string | null;
    last_name?: string | null;
    middle_name?: string | null;
    username?: string | null;
    user_type: string | null;
    enabled: number | null;
    roles?: UserRoles[];
    owner?: string;
}