import {useState} from 'react';
import './App.css';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());


function App() {

  let [sort, setSort] = useState("film")

  const { data, error } = useSWR(`http://localhost:8000/movies/?ordering=${sort},id`, fetcher);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <div className="App">
      <h1>SWR Sandbox</h1>
      <p>Experiments with the React framework <a href="https://swr.vercel.app/">swr</a>.</p>
      <button onClick={() => {setSort("film")}}>Name</button>
      <button onClick={() => {setSort("year")}}>Year</button>
      <button onClick={() => {setSort("lead_studio")}}>Studio</button>
      <table className="customTable">
        <thead>
          <tr>
            <th>Title</th>
            <th className="THCell">Year</th>
            <th>Lead Studio</th>
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
