import { useEffect } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../../redux/slices/tokenSlice";


const Login = () => {
  const history = useHistory();
  const accessToken = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      history.push("/create-playlist");
    }
  }, [accessToken, history]);


const accessTokenfromUrl = window.location.hash
.substring(1, window.location.hash.length - 1)
.split("&")[0]
.split("=")[1];

  if (accessTokenfromUrl) {
    dispatch(setAccessToken({ accessToken: accessTokenfromUrl }));
    history.push({
      pathname: "/create-playlist",
    });
  }

  const handleLogin = () => {
    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/&scope=playlist-modify-private playlist-read-private`
    );
  };

  return (
    <div className="App">
      <div className="btn-wrapper">
        <h1>Musikin</h1>  
        <button className="btn bg-secondary1" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;