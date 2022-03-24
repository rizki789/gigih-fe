import logo from './logo.svg';
import data from './data/single-sample';
import './App.css';
import AlbumItem from './components/AlbumItem';

function App() {
  return (
    <section>
      <div className="container">
        <div className="song">
          <div className="song-img">
            <img src={data.album.images[0].url} className="App-logo" alt="logo" />
          </div>
          <div className="song-desc">
            <p>{data.album.name}</p>
            <p>{data.artists[0].name}</p>
            <button>Select</button>
          </div>
        </div>
        <AlbumItem data={data}/>
      </div>
    </section>
  );
}

export default App;
