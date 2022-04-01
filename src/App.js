import { useState } from "react";
import { formatToMinutesSecond } from "./utils/formatToMinutesSecond";
import Login from "./pages/Login"


const Home = () => {
  const [accessToken, setAccessToken] = useState(window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1])
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value)
  };

  const handleSearch = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
      search +
      "&access_token=" +
      accessToken +
      "&type=track"
    )
      .then((data) => data.json())
      .then((data) => {
        setData(data.tracks.items)
      });
  };

  const handleSelect = (data) => {
    if (selectedData.includes(data)) {
      const findIndex = selectedData.findIndex((v) => v === data);
      setSelectedData((prevData) => {
        const newArr =[...prevData.slice(0, findIndex), ...prevData.slice(findIndex+1, prevData.length)];
        console.log(newArr)
        return newArr
      })
    } else {
      setSelectedData((prevData) => [...prevData, data])
    }
  }


  if(!accessToken) {
    return <Login />
  }

return (
  <div className="layout" style={{ marginTop: 20 }}>
    <div className="search-box">
      <input
        onChange={handleChange}
        placeholder="Find tracks that you want"
      />
      <div className="btn-wrapper">
        <button className="btn" onClick={handleSearch}>
          Cari
        </button>
      </div>
    </div>

    <div style={{width:"100%"}}>
      <table style={{display:"flex", width:"100%"}}>
        <thead>
          <tr></tr>
        </thead>
        <tbody style={{width:"100%"}}>
          {data.map((item) => (
            <tr key={item.uri} style={{display:'flex', alignItems:"center", width:"100%", marginBottom:"10px"}}>
              <td className="">
                <img
                  className="img-box"
                  src={item.album.images[0].url}
                  alt={item.name}
                />
              </td>
              <td width="90%">
                <div>{item.name}</div>
                <div className="item-artist">{item.artists[0].name}</div>
              </td>
              <td className="select-box">
                <div>
                  {formatToMinutesSecond(item.duration_ms)}
                </div>
                <button className="btn" onClick={() => {
                    handleSelect(item.uri)
                  }}>{selectedData.includes(item.uri) ? "Deselect" : "Select"}</button>
              </td>

            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
)
}
export default Home;