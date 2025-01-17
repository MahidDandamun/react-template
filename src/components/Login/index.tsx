import React, { useEffect, useState } from 'react';
import { login } from '../../store/services/LoginService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../store/services/LoginService';
import logo from '../../assets/xurpaslogo.png';
import loginFrame from '../../assets/login-frame.png';
// import eyeOpen from '../../assets/icons/eye-open.svg';
import eyeOpen from '../../assets/icons/eye-open-icon.svg';
import eyeClose from '../../assets/icons/eye-closed-icon.svg';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, token, tokenExpiration, isLoading } = useAppSelector(
    (state) => state.login
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      dispatch(login({ username, password })); // Dispatch the login action with credentials
    }
  };

  useEffect(() => {
    const validateOnMount = async () => {
      if (token && tokenExpiration) {
        const isTokenValid = Date.now() < parseInt(tokenExpiration);
        if (isTokenValid) {
          if (!isLoading) {
            dispatch(validateToken());
          }
        } else {
          localStorage.clear();
        }
      }
    };

    if (isLoggedIn) {
      navigate('/');
    } else {
      validateOnMount(); // Call validation on component mount
    }
  }, [dispatch, token, tokenExpiration, isLoggedIn, isLoading, navigate]);

  // console.log(token);

  return (
    <div className="flex flex-col justify-center lg:flex-row lg:items-center h-screen p-10 bg-hero bg-no-repeat bg-cover bg-center bg-fixed bg-[url('/src/assets/login-bg.jpg')]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <img
          className="lg:block hidden"
          src={loginFrame}
          alt="login frame"
          width="600"
          height="300"
        />
        <div className="flex flex-col justify-center lg:bg-white lg:shadow-lg lg:p-12 bg-transparent rounded-e-2xl">
          <div className="flex flex-col items-center justify-center mb-6">
            <img src={logo} alt="logo" className="w-20 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jdelacruz"
                className="mt-1 p-3 w-full border-2 border-black rounded-lg placeholder-shown:border-gray-300 focus:outline-none focus:ring-black"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={visible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="mt-1 p-3 w-full border-2 bg- border-black rounded-lg placeholder-shown:border-gray-300 focus:outline-none focus:ring-black"
                />
                <div
                  className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <img src={eyeOpen} alt="See password" />
                  ) : (
                    // change this with eyeClose icon
                    <img src={eyeClose} alt="See password" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-4 rounded-lg text-lg font-medium bg-black text-white hover:bg-slate-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
