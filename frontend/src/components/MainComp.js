import * as React from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./mainComp.css";

export default function MainComp() {
  const [input, setInput] = React.useState("0xfb626333099a91ab677bcd5e9c71bc4dbe0238a8");
  const [currentProj, setCurretProj] = React.useState([]);

  const handleSearch = async () => {
    try {
      const resp = await axios.get(`http://127.0.0.1:8000/user/${input}`);
      setCurretProj(resp.data.trxs);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {}, [currentProj]);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <h1>Explore Your Trxs</h1>
          <input onChange={(e) => setInput(e.target.value)}></input>
          <button onClick={handleSearch}>Search</button>
          <table id="customers">
            <thead>
              <tr>
                <th>Destination Address</th>
                <th>Number of Transaction</th>
                <th>Hashes</th>
              </tr>
            </thead>
            <tbody>
              {currentProj ? (
                currentProj.map((i, index) => (
                  <tr key={index}>
                    <td>{i.destAddress}</td>
                    <td>{i.hashes.length}</td>
                    <td>
                      {i.hashes.slice(0, 5).map((hash) => (
                        <div className="parent">
                          <div key={hash}>{hash.slice(0, 10) + "..."}</div>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>text1.1</td>
                  <td>text1.3</td>
                </tr>
              )}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
