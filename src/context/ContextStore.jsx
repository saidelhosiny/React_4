import { createContext, useState, useEffect } from "react";
import axios from "axios";

export let CreateOllApp = createContext(0);

export default function ContextStore({ children }) {
  const [dataMovic, SetDataMovic] = useState(null);

  async function getDataMovic() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=5fbe34b0d2f3eb5e0a8225d88a6cf2c2"
    );

    let ollDataMovic = data.results;
    SetDataMovic(ollDataMovic);
  }

  // TV....
  let [Tv, SetTv] = useState(null);

  async function getTvData() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=5fbe34b0d2f3eb5e0a8225d88a6cf2c2"
    );
    let dataTv = data.results;
    SetTv(dataTv);
  }

  // People...

  let [People, SetPeople] = useState(null);

  async function getPeopleData() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/day?api_key=5fbe34b0d2f3eb5e0a8225d88a6cf2c2"
    );

    let dataPeople = data.results;
    SetPeople(dataPeople);
  }

  useEffect(() => {
    getDataMovic();
    getTvData();
    getPeopleData();
  }, []);

  return (
    <CreateOllApp.Provider value={{ Tv, People, dataMovic }}>
      {children}
    </CreateOllApp.Provider>
  );
}
