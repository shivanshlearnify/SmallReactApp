import React, { useEffect, useState } from "react";

const Cards = ({ name, url }) => {
  const [data, setData] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const datavalue = await response.json();
        setData(datavalue);
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);
  return (
    <section className="border rounded-3xl flex flex-col items-center p-6 w-[300px] gap-4 cursor-pointer hover:bg-green-100 capitalizes">
      <img src={data?.sprites?.other?.dream_world?.front_default} alt={name} className="w-[200px] h-[200px]"/>
      <div className="flex flex-col items-start gap-2 h-[280px]">
        <h1 className="text-2xl font-bold">{name}</h1>
        <h2 className="font-medium">Height - {data?.height}</h2>
        <h2 className="font-medium">Weight - {data?.weight}</h2>
        <h2 className="font-medium">Moves</h2>
        <div className="flex flex-wrap gap-2" >{data?.moves.slice(0,5).map((move,index)=> {
            return (
                <span className="bg-green-400 text-white rounded-2xl px-3 py-2" key={index}>{move?.move?.name}</span>
            )
        })}</div>
      </div>
    </section>
  );
};

export default Cards;
