// import React, { useEffect } from "react";
import React from "react";
import "./track.styles.css";

const AlbumItem = ({ data, selected, setSelected }) => {

console.log(data.album);
return (
    <div className="card-suggested">
      <div id="img-album">
        {/* <img src="https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b" /> */}
        <img src={data.album.images[0].url} alt={data.title}/>
      </div>
      <div id="album-detail card-content">
        <h2 id="album-title">{data.album.name}</h2>
        <div id="artist-info">
          <p>
            Artist : <span id="artist-name">{data.artists[0].name}</span>
          </p>
          <p>
            Release Date : <span id="release-date">{data.album.release_date}</span>
          </p>
          <p>
            Total Tracks : <span id="total-tracks">{data.album.total_tracks}</span>
          </p>
          <button className="btn bg-secondary">Select</button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <div id="img-album">
                <img src={data.album.images[0].url} alt={data.title} />
              </div>
            </td>
            <td width="100%">
              <div id="album-detail card-content">
                <h2 id="album-title">{data.name}</h2>
                <div id="artist-info">
                  <p>
                    <span id="artist-name">{data.artists[0].name}</span>
                  </p>
                </div>
              </div>
            </td>
            <td>
              {selected.includes(data.uri) ? (
                <button
                  className="btn bg-secondary"
                  onClick={() =>
                    setSelected(selected.filter((uri) => uri !== data.uri))
                  }
                >
                  Deselect
                </button>
              ) : (
                <button
                  className="btn bg-secondary"
                  onClick={() => setSelected([...selected, data.uri])}
                >
                  Select
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AlbumItem;