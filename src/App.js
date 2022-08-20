import {useState, useEffect} from 'react';
import './App.css';
import useSWR from "swr";
import SortArrows from './components/sortarrows.js'

const fetcher = (url) => fetch(url).then((res) => res.json());


function App() {

  const [sortArgument, setSortArgument] = useState("film,id")
  const [sortOrder, setSortOrder] = useState("UP")
  const [sortKey, setSortKey] = useState("film")

  useEffect(() => {
      console.log(`Z : ${sortArgument} . sortKey : ${sortKey} .`)
      if (sortOrder === "UP"){
          setSortArgument(`${sortKey},id`)
      }else{
          setSortArgument(`-${sortKey},id`)
      }
  }, [sortOrder]); 
  //
  const toggleSortInner = () => {
      if (sortOrder === "UP")
      {
        setSortOrder("DOWN")
      }
      else
      {
        setSortOrder("UP")
      }
  }
  //
  const toggleSortFilm = () => {
      setSortKey('film')
      toggleSortInner()
  }
  //
  const toggleSortStudio = () => {
      setSortKey('lead_studio')
      toggleSortInner()
  }
  //
  const toggleSortYear = () => {
      setSortKey('year')
      toggleSortInner()
  }
  //
  const { data, error } = useSWR(`http://localhost:8000/movies/?ordering=${sortArgument}`, fetcher);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  //
  return (
    <div className="App">
      <h1>SWR Sandbox</h1>
      <p>Experiments with the React framework <a href="https://swr.vercel.app/">swr</a>.</p>
      <table className="customTable">
        <thead>
          <tr>
            <th>
                Title
                &nbsp;
                <SortArrows toggleSort={toggleSortFilm}  />
            </th>
            <th className="THCell">
                Year
                &nbsp;
                <SortArrows toggleSort={toggleSortYear}  />
            </th>
            <th>
                Lead Studio
                &nbsp;
                <SortArrows toggleSort={toggleSortStudio}  />
            </th>
          </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              {item.film}
            </td>
            <td className="YearCell">
              {item.year}
            </td>
            <td>
              {item.lead_studio}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
