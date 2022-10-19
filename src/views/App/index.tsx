import { useState, useCallback, useEffect } from "react";
import SearchInput from "../../components/SearchInput";

import SearchList, { HistoryItem } from "../../components/SearchList";
import api from "../../services/api";
import { LocationData, LocationError } from "../../services/api/types";
import LocationBlock from "../LocationBlock";

import "./style.sass";

function App() {
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [customLocation, setCustomLocation] = useState<LocationData | null>(
    null
  );

  const getUserLocation = async () => {
    try {
      const { ip } = await api.getUserIp();
      const location = await api.getLocation(ip);
      setUserLocation(location);
    } catch (error) {
      alert((error as LocationError).info);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const onSearchSubmit = useCallback(async () => {
    setSearchHistory((history) =>
      history.concat({ id: Date.now(), text: searchValue })
    );
    try {
      setLoading(true);
      const location = await api.getLocation(searchValue);
      setCustomLocation(location);
    } catch (error) {
      alert((error as LocationError).info);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  if (!userLocation) {
    return null;
  }

  return (
    <div className="app-container">
      <SearchList list={searchHistory} />
      <div className="app-right-content">
        <LocationBlock location={userLocation} />
        <div className="search-container">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={onSearchSubmit}
          />
        </div>
        {customLocation && <LocationBlock location={customLocation} />}
      </div>
    </div>
  );
}

export default App;
