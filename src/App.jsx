import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=40"
        );
        const datavalue = await response.json();
        setData(datavalue?.results);
        setFilteredData(datavalue?.results); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const searchInput = e.target.value;
    setInput(searchInput);
    
  };

  const handleSearch = ()=>{
    const filtered = data.filter((pokemon) =>
      pokemon?.name.toLowerCase().includes(input.toLowerCase())
    );
    
    setFilteredData(filtered);
  }
  const handleFilterButton = ()=>{
    setFilteredData(data);
    setInput("");
  }

  return (
    <div className="max-w-7xl mx-auto capitalize">
      <Navbar />
      <div className="flex gap-2 mt-5 mb-5">
        <input
          type="text"
          className="border rounded-2xl w-96 px-4 py-2 text-lg font-medium text-gray-500"
          placeholder="Enter Pokemon name"
          value={input}
          onChange={handleFilter}
        />
        <button className="text-2xl font-bold bg-black text-white rounded-lg px-3" onClick={handleSearch}>Search</button>
        <button className="text-2xl font-bold bg-black text-white rounded-lg px-3" onClick={handleFilterButton}>Clear filter</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {filteredData.map((pokemon, index) => (
          <div key={index}>
            <Cards name={pokemon?.name} url={pokemon?.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
