const AlbumItem = (props) => {
    return(
        <div className="song">
          <div className="song-img">
            <img src={props.data.album.images[0].url} className="App-logo" alt="logo" />
          </div>
          <div className="song-desc">
            <p>{props.data.album.name}</p>
            <p>{props.data.artists[0].name}</p>
            <button>Select</button>
          </div>
        </div>
    );
}
export default AlbumItem;