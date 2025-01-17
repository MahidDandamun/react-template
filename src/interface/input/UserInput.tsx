export interface UserInput {
  username?: string;
  last_name?: string;
  first_name: string;
  middle_name?: string;
  email?: string;
  new_password?: string;
  roles?:  {role: string}[]; 
}
