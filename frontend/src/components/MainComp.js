import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./mainComp.css";

export default function MainComp() {
  const [input, setInput] = useState();
  const [userAddress, setUserAddress] = useState("");
  const [currentProj, setCurretProj] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`http://127.0.0.1:8000/user/${input}`);
      setUserAddress(resp.data.userAddress);
      setCurretProj(resp.data.trxs);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleLink = async (address) => {
    try {
      setLoading(true);
      const resp = await axios.get(`http://127.0.0.1:8000/trxs/${address}`);
      setUserAddress(resp.data.userAddress);
      setCurretProj(resp.data.trxs);
      setLoading(false);
      setCount(count + 1);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {}, [currentProj, loading, count]);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <h1>Explore Your Trxs</h1>
          <input value={input} onChange={(e) => setInput(e.target.value)}></input>
          <h3>{userAddress}</h3>
          <button onClick={handleSearch}>Search</button>
          <table id="customers">
            <thead>
              <tr>
                <th>Destination Address (node)</th>
                <th>Number of Transaction (edge)</th>
                <th>Hashes (edge)</th>
              </tr>
            </thead>
            <tbody>
              {count < 4 ? (
                !loading ? (
                  currentProj ? (
                    currentProj.map((i, index) => (
                      <tr key={i.destAddress}>
                        <td>
                          <button onClick={() => handleLink(i.destAddress)}>
                            search node
                            {" " + i.destAddress.slice(0, 5) + "..." + i.destAddress.slice(-5)}
                          </button>
                        </td>
                        <td>{i.hashes.length}</td>
                        <td>
                          {i.hashes.slice(0, 5).map((hash) => (
                            <div key={hash} className="parent">
                              <div>{hash.slice(0, 5) + "..." + hash.slice(-5)}</div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr></tr>
                  )
                ) : (
                  <tr>
                    <td></td>
                    <td>
                      <h1>loading....</h1>
                    </td>
                    <td></td>
                  </tr>
                )
              ) : (
                <tr>
                  <td></td>
                  <td>
                    <h2>Max depth is 3 , search from beginning</h2>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
