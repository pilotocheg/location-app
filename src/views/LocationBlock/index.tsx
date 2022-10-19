import { FC } from "react";
import Info from "../../components/Info";
import Map from "../../components/Map";
import { LocationData } from "../../services/api/types";

import "./style.sass";

interface Props {
  location: LocationData;
}

const LocationBlock: FC<Props> = ({ location }) => {
  return (
    <div className="location-block">
      <Map lat={location.latitude} lon={location.longitude} />
      <Info info={location} />
    </div>
  );
};

export default LocationBlock;
