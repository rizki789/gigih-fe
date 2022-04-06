import { useState } from "react";
import { formatToMinutesSecond } from "./utils/formatToMinutesSecond";
import { constants } from "./utils/constants";
import Login from "./pages/Login"
import Home from "./pages/Home"
import UserPlaylist from './components/playlist/index';
import {useSelector} from 'react-redux';


const App = () => {
  // const [accessToken, setAccessToken] = useState(window.location.hash
  //   .substring(1, window.location.hash.length - 1)
  //   .split("&")[0]
  //   .split("=")[1]);
  
  const accessToken = useSelector(state=> state.token.token)

    return (
      <div>
        {accessToken? <Home/>:<Login/>}
      </div>
  )

}

export default App;