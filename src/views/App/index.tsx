import { useState, useCallback, useEffect } from "react";

import SearchInput from "../../components/SearchInput";
import SearchList, { HistoryItem } from "../../components/SearchList";
import validateInput from "../../helpers/validateInput";
import api from "../../services/api";
import { LocationData, LocationError } from "../../services/api/types";
import LocationBlock from "../LocationBlock";

import "./style.sass";

function App() {
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
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

  const onSearchValueChange = useCallback((value: string) => {
    setSearchValue(value);
    setError(undefined);
  }, []);

  const onSearchSubmit = useCallback(async () => {
    if (
      searchHistory.length &&
      searchValue === searchHistory.slice(-1)[0].text
    ) {
      return; // do nothing if the value hasn't changed from the last search
    }

    const inputError = validateInput(searchValue);
    if (inputError) {
      return setError(inputError);
    }
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
  }, [searchValue, searchHistory]);

  if (!userLocation) {
    return (
      <div className="app-loader-container">
        <i className="fa fa-circle-o-notch fa-spin" />
      </div>
    );
  }

  return (
    <div className="app-container">
      <SearchList list={searchHistory} />
      <div className="app-right-content">
        <LocationBlock title="User location:" location={userLocation} />
        <div className="search-container">
          <SearchInput
            loading={loading}
            error={error}
            value={searchValue}
            onChange={onSearchValueChange}
            onSubmit={onSearchSubmit}
          />
        </div>
        {customLocation && (
          <LocationBlock title="Searched location:" location={customLocation} />
        )}
      </div>
    </div>
  );
}

export default App;
