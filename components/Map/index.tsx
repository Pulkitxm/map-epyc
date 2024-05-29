"use client";

import { peopleAtom } from "@/globals/state/people";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import LocalPeople from "@/data/people";

function MapboxMap() {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);
  const [people, setPeople] = useRecoilState(peopleAtom);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken:
        "pk.eyJ1IjoicHVsa2l0eG0iLCJhIjoiY2x3cm82NnQzMDJtajJrc2JwenJ5c2RrdiJ9.pb_qGeXbzAy-DHJnNMEDaA",
      center: [-74.5, 40],
      zoom: 9,
    });
    mapboxMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || done) return;

    // Remove all existing markers
    markers.forEach((marker) => {
      console.log(marker);
      marker.remove();
    });

    // Add new markers
    const newMarkers = people.map((person) => {
      person.fullName === "Abagael Priestley" && console.log(person);

      const newMarker = new mapboxgl.Marker()
        .setLngLat([
          person["location.lng"] as number,
          person["location.lat"] as number,
        ])
        .setPopup(
          new mapboxgl.Popup({ closeOnClick: false }).setHTML(`
            <div class="flex">
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
    setDone(true);
    setMarkers(newMarkers);
  }, [map, people]);

  useEffect(() => {
    setPeople(LocalPeople);
  }, [setPeople]);

  return <div ref={mapNode} style={{ width: "100vw", height: "100vh" }} />;
}

export default MapboxMap;
