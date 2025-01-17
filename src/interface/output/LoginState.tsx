interface UserData {
  full_name: string;
  username: string;
  email: string;
  name: string;
}

export default interface LoginState {
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  token: string | null;
  tokenExpiration: string | null;
  userData: UserData | null;
}
