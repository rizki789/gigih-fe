// import {Component} from 'react'

// class login extends Component {
//   state={
//       access_token: '',
//       refresh_token: '',
//       token_type: '',
//       expires_in: '',
//   }
//       render(){
//       return(
//           <div>
//               <h1>Login</h1>
//               <form>              
//                   <a href={url}>Login</a>
//               </form>
//           </div>
//       )
//       }
//   }

// export default function login ({ image, title, artist }) {
//   return (
//     <div className="song">
//       <div className="song-img">
//         <img src={image} alt="logo" />
//       </div>
//       <div className="song-desc">
//         <p>{title}</p>
//         <p>{artist}</p>
//         <button>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// const Login = () => {
//   const handleLogin = () => {
//     window.open(
//       `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`
//     );
//   };
//   return (
//     <div className="App">
//       <div className="btn-wrapper">
//         <h1>Click here..</h1>  
//         <button className="btn bg-secondary1" onClick={() => handleLogin()}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login; 