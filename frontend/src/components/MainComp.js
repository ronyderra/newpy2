import * as React from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./mainComp.css";

export default function MainComp() {
  const [input, setInput] = React.useState("0xfb626333099a91ab677bcd5e9c71bc4dbe0238a8");
  const [userAddress, setUserAddress] = React.useState("");
  const [currentProj, setCurretProj] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`http://127.0.0.1:8000/user/${input}`);
      setUserAddress(resp.data.userAddress);
      setCurretProj(resp.data.trxs);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLink = async (address) => {
    try {
      console.log({ address });
      setLoading(true);
      const resp = await axios.get(`http://127.0.0.1:8000/trx/${address}`);
      setUserAddress(resp.data.userAddress);
      setCurretProj(resp.data.trxs);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {}, [currentProj, loading]);

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
              {!loading ? (
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
              )}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
