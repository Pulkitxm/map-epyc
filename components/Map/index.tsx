"use client";

import { peopleAtom } from "@/globals/state/people";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

function MapboxMap({
  map,
  setMap,
}: {
  map: mapboxgl.Map | undefined;
  setMap: Dispatch<SetStateAction<mapboxgl.Map | undefined>>;
}) {
  const mapNode = useRef(null);
  const people = useRecoilValue(peopleAtom);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken:
        "pk.eyJ1IjoicHVsa2l0eG0iLCJhIjoiY2x3cm82NnQzMDJtajJrc2JwenJ5c2RrdiJ9.pb_qGeXbzAy-DHJnNMEDaA",
      center: [77.2373, 28.6542],
      zoom: 3,
    });
    mapboxMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Remove old markers
    markers.forEach((marker) => marker.remove());

    // Add new markers
    const newMarkers = people.map((person) => {
      const newMarker = new mapboxgl.Marker()
        .setLngLat([
          person["location.lng"] as number,
          person["location.lat"] as number,
        ])
        .setPopup(
          new mapboxgl.Popup({ closeOnClick: false }).setHTML(`
            <div class="flex select-none">
              <img src="${person.photo}" class="h-[70px] rounded-full">
              <div class="flex flex-col justify-around">
                <h1 class="text-lg">${person.fullName}</h1>
                <h1 class="text-lg">${person["location.city"]}</h1>
              </div>
            </div>
          `)
        )
        .addTo(map);
      newMarker.togglePopup();
      return newMarker;
    });
    newMarkers.length > 0 &&
      map.flyTo({
        center: [newMarkers[0].getLngLat().lng, newMarkers[0].getLngLat().lat],
        zoom: 7,
      });
    setMarkers(newMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, people]);

  return (
    <div id="map" ref={mapNode} style={{ width: "100vw", height: "100vh" }} />
  );
}

export default MapboxMap;
