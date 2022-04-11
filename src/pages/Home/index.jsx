import axios from "axios";
import React from 'react';
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_SPOTIFY } from "../../utils/constants";
import { formatToMinutesSecond } from "../../utils/formatToMinutesSecond";
import { removeAccessToken } from "../../redux/slices/tokenSlice";
import { useDispatch} from "react-redux";


const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [, setDataPlaylist] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const accessToken = useSelector(state=>state.token.token);

  const getProfileUser = async () => {
    const response = await axios.get(
      API_SPOTIFY + `me?access_token=${accessToken}`
    );
    return response.data;
  };

  const getUserPlaylist = async () => {
    const response = await axios.get(
      API_SPOTIFY + `me/playlists?access_token=${accessToken}`
    );
    return response.data;
  };

  const addTracksToPlaylist = async () => {
    let allTracks = "";
    selectedData.forEach((it) => {
      allTracks += it + ",";
    });
    const response = await axios.post(
      API_SPOTIFY +
        `playlists/${playlist.id}/tracks?access_token=${accessToken}&uris=${allTracks}`
    );
    toast.success("Tracks added");
    setSelectedData([]);
    setSearch("");
    setData([]);
    return response.data;
  };

  const createPlaylist = async (data) => {
    setLoading(true);
    const response = await axios.post(
      API_SPOTIFY + `users/${userId}/playlists?access_token=${accessToken}`,
      {
        ...data,
        public: false,
      }
    );
    setLoading(false);
    setPlaylist(response.data);
    setForm({});
    toast.success("Playlist successfully added");
    return response.data;
  };

  useEffect(async () => {
    const profileUser = await getProfileUser();
    setUserId(profileUser.id);
  }, []);

  useEffect(async () => {
    if (accessToken) {
      const playlistResponse = await getUserPlaylist();
      setDataPlaylist(playlistResponse.items);
    }
  }, [accessToken]);

  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(form);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
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
        setData(data.tracks.items);
      });
  };

  const handleAdd = () => {
    addTracksToPlaylist();
  };

  const handleSelect = (data) => {
    if (selectedData.includes(data)) {
      const findIndex = selectedData.findIndex((v) => v === data);
      setSelectedData((prevData) => {
        const newArr = [
          ...prevData.slice(0, findIndex),
          ...prevData.slice(findIndex + 1, prevData.length),
        ];
        return newArr;
      });
    } else {
      setSelectedData((prevData) => [...prevData, data]);
    }
  };

  return (
    <div className="layout" style={{ paddingTop: 20 }}>
      <div>
        <Toaster />
        <h2 className="text-3xl font-bold text-white pt-8">Add Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                onChange={handleInputForm}
                placeholder="Insert your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={handleInputForm}
                rows="3"
                placeholder="Insert your description"
              />
            </div>

            <button className="bg-[#1db954] mt-6 text-gray-800 px-6 py-2 rounded-full font-bold">
              {loading ? "Loading" : "Add Playlist"}
            </button>
          </div>
        </form>

        <hr className="mt-6 " />
      </div>

      <div className="search-box mt-6 text-white">
        <input
          onChange={handleChange}
          placeholder="Find tracks that you want"
          className="text-slate-600"
        />
        <div className="btn-wrapper">
          <button className="btn" onClick={handleSearch}>
            Cari
          </button>
        </div>
      </div>

      <button
        className="w-full bg-[#1db954] mt-2 rounded-full py-2"
        onClick={handleAdd}
      >
        Add to {playlist.name} Playlist
      </button>

      

      

      <div style={{ width: "100%" }} className="text-white mt-4">
        <table style={{ display: "flex", width: "100%" }}>
          <thead>
            <tr></tr>
          </thead>
          <tbody style={{ width: "100%" }}>
            {data.map((item) => (
              <tr
                key={item.uri}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
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
                  <div>{formatToMinutesSecond(item.duration_ms)}</div>
                  <button
                    className="bg-[#1db954] w-[100px] rounded-full py-2 text-gray-800 ml-2"
                    onClick={() => {
                      handleSelect(item.uri);
                    }}
                  >
                    {selectedData.includes(item.uri) ? "Deselect" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
      <button className="button" type="button" onClick={ () => 
        dispatch(removeAccessToken())}>
        Logout
        </button>
    </div>
  );
};
export default Home;