import { ItemTrack } from "../../models/SearchTracks";

type Props = {
  data: ItemTrack;
  handleSelect: (data: string) => void;
  selectedData: string[];
};

const AlbumItem = ({ data, handleSelect, selectedData }: Props) => {
  const dateHoursMin = new Date(Date.UTC(0, 0, 0, 0, 0, 0, data.duration_ms));

  return (
    <div className="album-info">
      <div className="image-box" style={{ position: "relative" }}>
        <div className="overlay"></div>
        <img src={data.album.images[0].url} alt="" />
        <p className="image-box-text">{data.album.artists[0].name}</p>
      </div>
      <div className="album-description">
        <div>
          <p className="album-title">{data.name}</p>
          <p className="album-mini-info">
            {data.disc_number} songs, {dateHoursMin.getUTCMinutes()} hr{" "}
            {dateHoursMin.getUTCSeconds()} min
          </p>
        </div>

        <div>
          <button
            className="btn btn-select"
            onClick={() => {
              handleSelect(data.uri);
            }}
          >
            {selectedData.includes(data.uri) ? "Deselect" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AlbumItem;