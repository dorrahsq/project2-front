// import ReactSearchBox from "react-search-box";
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const BASE_URL = "http://localhost:5000";

// const Search = () => {
//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState(allData);

//   useEffect(() => {
//     getAllPosts();
//   }, []);

//   const getAllPosts = async () => {
//     const posts = await axios.get(`${BASE_URL}/posts/`);
//     setAllData(posts.data);
//     setFilteredData(posts.data);
//     console.log(posts.data);
//   };

//   //http://localhost:5000/posts/hash?hashtags=coffee

//   const handleSearch = (event) => {
//     let value = event.target.value.toLowerCase();
//     let result = [];
//     if (value){
//     console.log(value);
//     result = allData.filter((data) => {
//       return data.title.search(value) != -1;
//     });
//     setFilteredData(result);}
//     else{
//         console.log("no result");
//     }
//   };

//   return (
//     <div>
//          {allData} ? (
//       <label>Search:</label>
//       <input type="text" onChange={(event) => handleSearch(event)} />

     
          
//         {filteredData.map((value, index) => {
//           return <div key={value._id}>{value.hashtags}</div>;
//         })}
//       ) : (
//         <h1>loading </h1>
//       )}
//     </div>
//   );
// };

// export default Search;
