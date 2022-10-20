import { FC, memo } from "react";
import Info from "../../components/Info";
import Map from "../../components/Map";
import { LocationData } from "../../services/api/types";

import "./style.sass";

interface Props {
  location: LocationData;
  title: string;
}

const LocationBlock: FC<Props> = ({ location, title }) => {
  return (
    <div className="location-block">
      <p className="title">{title}</p>
      <div className="content-block">
        <Map lat={location.latitude} lon={location.longitude} />
        <Info info={location} />
      </div>
    </div>
  );
};

export default memo(LocationBlock);
