import logo from './logo.svg';
import data from './data/all-sample';
import './App.css';
import AlbumItem from './components/AlbumItem/index';
import {Component} from "react"

class App extends Component {
  state = {
    accessToken: window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1],
    search: "",
    data: [],
  };

  handleLogin = () => {
    window.open(
      `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`
    );
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSearch = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        this.state.search +
        "&access_token=" +
        this.state.accessToken +
        "&type=track"
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: data.tracks.items,
        });
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.accessToken ? (
          <>
            <input onChange={this.handleChange} />
            <button onClick={this.handleSearch}>Cari</button>

            <div>{this.state.data.map((item) => item.name)}</div>
          </>
        ) : (
          <button onClick={this.handleLogin}>Login</button>
        )}
      </div>
    );
  }
}
    // console.log(this.state.accessToken)
    // return (
    //     <section>
    //       <div className="container">
    //         {/* {data.map((x) => {
    //           return <AlbumItem key={x.album.id} image={x.album.images[0].url} title={x.album.name} artist={x.artists[0].name} />;
    //         })} */}
    //         {this.state.accessToken ? (
    //           <>
    //             <input onChange={this.handleChange} />
    //             <button onClick={this.handleSearch}>Cari</button>
    
    //             <div>{this.state.data.map((item) => item.name)}</div>
    //           </>
    //         ) : (
    //           <button onClick={this.handleLogin}>Login</button>
    //         )}
    //       </div>
    //     </section>
    //   );
//   }
// }

export default App;
