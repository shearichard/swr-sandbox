import {useState, useEffect} from 'react';
import './App.css';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());


function SortArrows(props) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" onClick={props.toggleSort} width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
    )
}



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

  const toggleSortFilm = () => {
      setSortKey('film')
      if (sortOrder === "UP")
      {
        setSortOrder("DOWN")
      }
      else
      {
        setSortOrder("UP")
      }
  }
  const toggleSortStudio = () => {
      setSortKey('lead_studio')
      if (sortOrder === "UP")
      {
        setSortOrder("DOWN")
      }
      else
      {
        setSortOrder("UP")
      }
  }
  const toggleSortYear = () => {
      setSortKey('year')
      if (sortOrder === "UP")
      {
        setSortOrder("DOWN")
      }
      else
      {
        setSortOrder("UP")
      }
  }

  const { data, error } = useSWR(`http://localhost:8000/movies/?ordering=${sortArgument}`, fetcher);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <div className="App">
      <h1>SWR Sandbox</h1>
      <p>Experiments with the React framework <a href="https://swr.vercel.app/">swr</a>.</p>
      <button onClick={() => {setSortArgument("film")}}>Name</button>
      <button onClick={() => {setSortArgument("year")}}>Year</button>
      <button onClick={() => {setSortArgument("lead_studio")}}>Studio</button>
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
