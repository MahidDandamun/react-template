import React from 'react';
import { logout } from '../utils/logoutUtils';

const LogoutButton: React.FC = () => {
   
    return (
        <button
        className="hover:bg-gray-100 p-2 rounded-md w-full text-left"
        onClick={logout}
        >
        Logout
        </button>
    );
};

export default LogoutButton;
