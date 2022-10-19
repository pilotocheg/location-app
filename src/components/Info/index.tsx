import { FC } from "react";
import { LocationData } from "../../services/api/types";

import "./style.sass";
interface Props {
  info: LocationData;
}

const Info: FC<Props> = ({
  info: { city, country_name, ip, latitude, longitude },
}) => {
  return (
    <div className="info">
      <p>city: {city}</p>
      <p>country: {country_name}</p>
      <p>
        coordinates: {latitude.toFixed(2)} / {longitude.toFixed(2)}
      </p>
      <p>ip: {ip}</p>
    </div>
  );
};

export default Info;
