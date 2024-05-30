import { peopleAtom } from "@/globals/state/people";
import mapboxgl from "mapbox-gl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Results({
  map,
  showResults,
  setShowResults,
}: {
  map: mapboxgl.Map | undefined;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const people = useRecoilValue(peopleAtom);
  const slicedPeople = useMemo(() => {
    console.log(people.slice(0, 5).length);
    return people.slice(0, 5);
  }, [people]);
  function handleClick(index: number) {
    if (!map) return;

    const lat = Number(people[index]["location.lat"]);
    const lng = Number(people[index]["location.lng"]);
    setShowResults(false);
    map.flyTo({
      center: [lng, lat],
      zoom: 10,
    });
  }
  if (people.length && showResults)
    return (
      <div className="fixed top-0 left-0 md:top-[100px] md:left-6 w-screen md:w-[500px] bg-white rounded-xl flex flex-col items-center space-x-3 cursor-text p-0">
        {slicedPeople.map((person, index) => (
          <div
            key={person.id}
            className={`flex items-center space-x-3 w-full border-b-2 px-4 py-5 hover:bg-gray-200 transition-all duration-100 cursor-pointer
             ${index === slicedPeople.length ? "border-none" : ""}`}
            onClick={() => handleClick(index)}
            style={{
              margin: 0,
            }}
          >
            {person.photo ? (
              <Image
                src={person.photo}
                className="rounded-full"
                height={50}
                width={50}
                alt="imgae"
              />
            ) : (
              <div className="h-[50px] w-[50px] rounded-full bg-gray-600" />
            )}
            <div>
              <h1>{person.fullName}</h1>
              <h1>{person["location.city"]}</h1>
            </div>
          </div>
        ))}
      </div>
    );
}
