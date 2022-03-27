import logo from './logo.svg';
import data from './data/all-sample';
import './App.css';
import AlbumItem from './components/AlbumItem/index';

function App(props) {
  return (
    <section>
      <div className="container">
        {data.map((x) => {
          return <AlbumItem key={x.album.id} image={x.album.images[0].url} title={x.album.name} artist={x.artists[0].name} />;
        })}
      </div>
    </section>
  );
}

export default App;
