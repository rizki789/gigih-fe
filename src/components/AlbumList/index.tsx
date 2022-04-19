import { ItemTrack } from "../../models/SearchTracks";
import AlbumItem from "../AlbumItem";
import styles from "./album-list.module.css";

type Props = {
  data: ItemTrack[];
  handleSelect: (data: string) => void;
  selectedData: string[];
};

const AlbumList = ({ data, handleSelect, selectedData }: Props) => {
  return (
    <div className={styles.listAlbum}>
      {data.map((item: ItemTrack) => (
        <AlbumItem
          key={item.uri}
          data={item}
          handleSelect={handleSelect}
          selectedData={selectedData}
        />
      ))}
    </div>
  );
};

export default AlbumList;