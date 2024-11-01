import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import { useRef, useEffect } from "react";

function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken =  import.meta.env.VITE_MAPBOX_API;

    mapRef.current = new mapboxgl.Map({
      container: 'map-container',
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, []);

  return(
    <div id="map-container" className="h-1/2 border-b-2" ref={mapContainerRef}></div>
  );
}

export default Map;