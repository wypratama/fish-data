import { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import useApi from './hooks/useApi';

export enum Methods {
  read = 'read',
  append = 'append',
  edit = 'edit',
  delete = 'delete',
}

interface Commodity {
  uuid: string | null;
  komoditas: string | null;
  area_provinsi: string | null;
  area_kota: string | null;
  size: string | null;
  price: string | null;
  tgl_parsed: string | null;
  timestamp: string | null;
}

function App() {
  const [count, setCount] = useState(0);
  const { data: listData } = useApi<Commodity[]>(Methods.read, 'list');
  const { data: listOption } = useApi<Commodity[]>(Methods.read, 'option_size');

  console.log(listData, listOption);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>uuid</th>
              <th>komoditas</th>
              <th>area_provinsi</th>
              <th>area_kota</th>
              <th>size</th>
              <th>price</th>
              {/* <th>tgl_parsed</th>
              <th>timestamp</th> */}
            </tr>
          </thead>
          <tbody>
            {listData
              ?.filter((val) => val.komoditas !== null)
              .map((com, i) => {
                return (
                  <tr key={i}>
                    <td>{com.uuid || i}</td>
                    <td>{com.komoditas}</td>
                    <td>{com.area_provinsi}</td>
                    <td>{com.area_kota}</td>
                    <td>{com.size}</td>
                    <td>{com.price}</td>
                    {/* <td>{com.tgl_parsed}</td>
                    <td>{com.timestamp}</td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
