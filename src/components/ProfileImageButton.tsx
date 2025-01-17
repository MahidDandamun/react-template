import React from 'react';

const ProfileImageButton: React.FC = () => {
  const handleProfileClick = () => {
    // Implement profile image logic (e.g., redirect)
  };

  return (
    <button
      className="rounded-full overflow-hidden"
      onClick={handleProfileClick}
    >
      {/* Replace with your profile image placeholder */}
      {/* <img src="placeholder.jpg" alt="Profile Image" className="w-8 h-8" /> */}
    </button>
  );
};

export default ProfileImageButton;
