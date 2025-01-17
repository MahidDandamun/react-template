import React from 'react';

interface CreateButtonProps {
  item: string;
  onClick: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ item, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Create {item}
    </button>
  );
};

export default CreateButton;
