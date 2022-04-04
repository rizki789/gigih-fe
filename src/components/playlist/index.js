/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_SPOTIFY } from "../../utils/constants";

const Playlist = ({ accessToken }) => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

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
    return response.data;
  };

  useEffect(async () => {
    const profileUser = await getProfileUser();
    setUserId(profileUser.id);
  }, []);

  useEffect(async () => {
    if (accessToken) {
      const playlistResponse = await getUserPlaylist();
      setData(playlistResponse.items);
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

  return (
    <div className="layout">
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

      <div className="grid grid-cols-6">
        <div className="text-white">
          <h2 className="text-3xl font-bold text-white pt-8">My Playlist</h2>
        </div>

        <div className="grid grid-cols-4">{data?.map((item) => item.name)}</div>
      </div>
    </div>
  );
};

export default Playlist;