import axios from "axios";
import React from 'react';
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_SPOTIFY } from "../../utils/constants";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { removeAccessToken } from "../../redux/slices/tokenSlice";
import { useDispatch } from "react-redux";
import AlbumList from "../../components/AlbumList";

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

    const accessToken = useSelector(state => state.token.token);

    const getProfileUser = async() => {
        const response = await axios.get(
            API_SPOTIFY + `me?access_token=${accessToken}`
        );
        return response.data;
    };

    const getUserPlaylist = async() => {
        const response = await axios.get(
            API_SPOTIFY + `me/playlists?access_token=${accessToken}`
        );
        return response.data;
    };

    const addTracksToPlaylist = async() => {
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

    const createPlaylist = async(data) => {
        setLoading(true);
        const response = await axios.post(
            API_SPOTIFY + `users/${userId}/playlists?access_token=${accessToken}`, {
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

    useEffect(async() => {
        const profileUser = await getProfileUser();
        setUserId(profileUser.id);
    }, []);

    useEffect(async() => {
        if (accessToken) {
            const playlistResponse = await getUserPlaylist();
            setDataPlaylist(playlistResponse.items);
        }
    }, [accessToken]);

    const handleInputForm = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value });
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
                  <Input
                    id="name"
                    name="name"
                    bg="white"
                    onChange={handleInputForm}
                    placeholder="Insert your name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    bg="white"
                    onChange={handleInputForm}
                    rows="3"
                    placeholder="Insert your description"
                  />
                </div>
    
              <Button
              type="submit"
              isLoading={loading}
              className="bg-[#1db954] mt-6 text-gray-800 px-6 py-2 rounded-full font-bold"
            >
              Add Playlist
            </Button>
              </div>
            </form>
    
            <hr className="mt-6 " />
          </div>
    
          {/* <div className="search-box mt-6 text-white"> */}
          <div className="search-box mt-6 text-white flex space-x-2">
            <Input
              bg="white"
              onChange={handleChange}
              placeholder="Find tracks that you want"
              className="text-slate-600"
            />
            <div className="btn-wrapper">
              <Button 
              width="full"
              className="btn" onClick={handleSearch}>
                Cari
              </Button>
            </div>
          </div>
    
          <button
            // className="w-full bg-[#1db954] mt-2 rounded-full py-2"
            className="bg-white text-black w-full py-2 rounded-lg"

            onClick={handleAdd}
          >
            Add to {playlist.name} Playlist
          </button>
       
          <AlbumList
              data={data}
              handleSelect={handleSelect}
              selectedData={selectedData}
            />
          <button className="button" type="button" onClick={ () => 
            dispatch(removeAccessToken())}>
            Logout
            </button>
        </div>
      );
    };
    export default Home;