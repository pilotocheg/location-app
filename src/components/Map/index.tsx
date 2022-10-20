import { useRef, useCallback, useMemo, FC, useEffect, memo } from "react";
import OLMap from "ol/Map";
import OLView from "ol/View";
import OLFeature from "ol/Feature";
import GeomPoint from "ol/geom/Point";
import OLTileLayer from "ol/layer/Tile";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OLXYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

import "./style.sass";

interface Props {
  lat: number;
  lon: number;
}

const MAP_DEFAULT_ZOOM = 10;

const Map: FC<Props> = ({ lat, lon }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const coordinates = useMemo(() => fromLonLat([lon, lat]), [lon, lat]);

  const { current: marker } = useRef(
    new Vector({
      source: new VectorSource({
        features: [
          new OLFeature({
            geometry: new GeomPoint(coordinates),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "http://cdn.mapmarker.io/api/v1/pin?text=&size=30&hoffset=1",
        }),
      }),
    })
  );

  const { current: map } = useRef(
    new OLMap({
      target: undefined,
      layers: [
        new OLTileLayer({
          source: new OLXYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
        marker,
      ],
      view: new OLView({
        center: coordinates,
        zoom: MAP_DEFAULT_ZOOM,
      }),
    })
  );

  useEffect(() => {
    const view = map.getView();
    view.setCenter(coordinates);
    view.setZoom(MAP_DEFAULT_ZOOM);
    const markerSource = marker.getSource();
    if (markerSource) {
      markerSource.clear();
      markerSource.addFeature(
        new OLFeature({
          geometry: new GeomPoint(coordinates),
        })
      );
    }
  }, [map, marker, coordinates]);

  const setContainerRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (!containerRef.current && ref) {
        map.setTarget(ref);
      }
      if (containerRef.current !== ref) {
        containerRef.current = ref;
      }
    },
    [map]
  );

  return <div className="map-container" ref={setContainerRef} />;
};

export default memo(Map);
