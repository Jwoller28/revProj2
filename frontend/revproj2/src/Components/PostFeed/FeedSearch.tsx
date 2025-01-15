// import React, { useState, useEffect } from 'react';
// import { sendTypeFilter } from '../../API/Axios';

// export interface FeedSearchProps {
//   onSearch: (query: string, isSearched: boolean) => void;
//   searchQuery: string;
//   searched: boolean;
// }

// export interface searchType {
//   type: string;
//   value: string;
// }

// function FeedSearch({ onSearch, searchQuery, searched }: FeedSearchProps) {
//   const [selectedType, setSelectedType] = useState("username");
//   const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

//   useEffect(() => {
//     setLocalSearchQuery(searchQuery);
//   }, [searchQuery]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const searchT: searchType = {
//       type: selectedType,
//       value: localSearchQuery,
//     };
//     await sendTypeFilter(searchT);
//     onSearch(localSearchQuery, true);
//   };

//   // Handle search input change
//   const handleChange = (e: any) => {
//     const value = e.target?.value;
//     setSearchQuery(value);
//     prop.onChange(value);
//   };

//   // Function to clear the search
//   const clearSearch = () => {
//     setSearchQuery("");                  // Reset search query state
//     prop.onChange("");                   // Reset the parent search handler
//     prop.setSearched(false);             // Reset the searched flag
//   };

//   const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedType(e.target.value);
//   };

//   const clearSearch = () => {
//     setLocalSearchQuery("");
//     setSelectedType("username");
//     onSearch("", false);
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '10px',
//       }}
//     >
//       <label
//         htmlFor="search-form"
//         style={{
//           fontWeight: 'bold',
//           marginBottom: '5px',
//           color: '#fff',
//           fontSize: '1.2rem',
//         }}
//       >
//         Search the Feed:
//       </label>
//       <form
//         id="search-form"
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: '10px',
//         }}
//       >
//         <select
//           id="typeInput"
//           style={{
//             padding: '10px',
//             borderRadius: '5px',
//             border: '1px solid #aaa',
//             fontSize: '1rem',
//             outline: 'none',
//             backgroundColor: '#1A1A1A',
//             color: '#fff',
//             cursor: 'pointer',
//           }}
//         >
//           <option value="username">Username</option>
//           <option value="tags">Tags</option>
//           <option value="text">Text</option>
//         </select>
//         <input
//           type="search"
//           id="feed-search"
//           value={searchQuery}
//           onChange={handleChange}
//           placeholder="Type your search..."
//           style={{
//             padding: '10px',
//             borderRadius: '5px',
//             border: '1px solid #aaa',
//             fontSize: '1rem',
//             width: '200px',
//             backgroundColor: '#1A1A1A',
//             color: '#fff',
//             outline: 'none',
//           }}
//         />
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: '#504dff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//           }}
//         >
//           Search
//         </button>
//         <button
//           type="button"
//           onClick={clearSearch}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: '#ff4444',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//           }}
//         >
//           Clear
//         </button>
//       </form>
//     </div>
//   );
  
// }

// export default FeedSearch;
import React, { useState, useEffect } from 'react';
import { sendTypeFilter } from '../../API/Axios';

export interface FeedSearchProps {
  onSearch: (query: string, isSearched: boolean) => void;
  searchQuery: string;
  searched: boolean;
}

export interface searchType {
  type: string;
  value: string;
}

function FeedSearch({ onSearch, searchQuery, searched }: FeedSearchProps) {
  const [selectedType, setSelectedType] = useState("username");
  const [localSearchQuery, setSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchT: searchType = {
      type: selectedType,
      value: localSearchQuery,
    };
    await sendTypeFilter(searchT);
    onSearch(localSearchQuery, true);
  };

  // Handle search input change
  const handleChange = (e: any) => {
    const value = e.target?.value;
    setSearchQuery(value);
    // prop.onChange(value);
    setSelectedType(value);

  };

  // Function to clear the search
  // const clearSearch = () => {
  //   setSearchQuery("");                  // Reset search query state
  //   prop.onChange("");                   // Reset the parent search handler
  //   prop.setSearched(false);             // Reset the searched flag
  // };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedType("username");
    onSearch("", false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <label
        htmlFor="search-form"
        style={{
          fontWeight: 'bold',
          marginBottom: '5px',
          color: '#fff',
          fontSize: '1.2rem',
        }}
      >
        Search the Feed:
      </label>
      <form
        id="search-form"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <select
          id="typeInput"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #aaa',
            fontSize: '1rem',
            outline: 'none',
            backgroundColor: '#1A1A1A',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <option value="username">Username</option>
          <option value="tags">Tags</option>
          <option value="text">Text</option>
        </select>
        <input
          type="search"
          id="feed-search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Type your search..."
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #aaa',
            fontSize: '1rem',
            width: '200px',
            backgroundColor: '#1A1A1A',
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            backgroundColor: '#504dff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={clearSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff4444',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
  
}

export default FeedSearch;