import './App.css';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());


function App() {

  const { data, error } = useSWR("http://localhost:8000/movies", fetcher);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div>
      <h1>SWR Sandbox</h1>
      <p>Experiments with the React framework <a href="https://swr.vercel.app/">swr</a>.</p>
      <table className="customTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Lead Studio</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              {item.film}
            </td>
            <td>
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
