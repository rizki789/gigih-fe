import React, { useEffect } from 'react';
import { RiLoginCircleFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setAccessToken } from '../../slices/authSlices';

function Login() {
  const history = useHistory();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      history.push('/create-playlist');
    }
  }, [accessToken, history]);

  const handleLogin = () => {
    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=https://gigih-fe.vercel.app/&scope=user-read-email playlist-modify-private playlist-read-private`,
    );
  };

  const accessTokenFromUrl = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split('&')[0]
    .split('=')[1];

  if (accessTokenFromUrl) {
    dispatch(setAccessToken({ accessToken: accessTokenFromUrl }));
    history.push({
      pathname: '/create-playlist',
    });
  }

  return (
    <div className="App">
      <div className="btn-wrapper">
        <button
          type="submit"
          className="bg-[#1db954] flex w-[240px] space-x-2 justify-center  items-center px-4 py-2 rounded-2xl font-semibold text-white"
          onClick={() => handleLogin()}
        >
          <div>
            <RiLoginCircleFill className="text-2xl" />
          </div>
          <p>Login</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
