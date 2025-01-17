import React, { useEffect, useState } from 'react';


interface SearchInputProps {
  items: Item[];

}
interface Item {
  name: string;
}

const SearchInput: React.FC<SearchInputProps> = ({items}) => {

 const [searchValue, setSearchValue] = useState<string>('');
 const [isFocused, setIsFocused] = useState<boolean>(false)
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    
  },[]);


  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    console.log(e.target.value)
    console.log(items)
    setFilteredItems(
              items.filter((item) =>
                item.name.toLowerCase().includes(e.target.value)
              )
            );
  }

  const handleItemClick = (item: Item) => {
    setSearchValue(item.name)
    setIsFocused(false)
    
  }

  return (

<div className="relative w-80">
       <input
        type="text"
        value={searchValue}
        onChange={handleSearchInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        placeholder="Search items..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isFocused && filteredItems.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-1 border border-gray-300 bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {filteredItems.map((item,index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;



// import React, { useState } from 'react';

// interface Item {
// //   id: number;
//   name: string;
// }

// interface SearchItemProps {
//   items: Item[];
// }

// const SearchInput: React.FC<SearchItemProps> = ({ items }) => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filteredItems, setFilteredItems] = useState<Item[]>(items);
//   const [isFocused, setIsFocused] = useState<boolean>(false);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);
//     setFilteredItems(
//       items.filter((item) =>
//         item.name.toLowerCase().includes(value)
//       )
//     );
//   };

//   const handleItemClick = (item: Item) => {
//     setSearchTerm(item.name); // Update the input field with the clicked item's name
//     setIsFocused(false); // Close the dropdown
//   };

//   return (
//     <div className="relative w-80">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setTimeout(() => setIsFocused(false), 100)}
//         placeholder="Search items..."
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       {isFocused && filteredItems.length > 0 && (
//         <ul className="absolute top-full left-0 w-full mt-1 border border-gray-300 bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10">
//           {filteredItems.map((item,index) => (
//             <li
//               key={index}
//               onClick={() => handleItemClick(item)}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//             >
//               {item.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchInput;



