"use client";

import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "./Hit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { peopleAtom } from "@/globals/state/people";
import LocalPeople from "@/data/people";
import { HitType } from "@/globals/types/person";
import SearchBar from "./SearchBar";
import Results from "./Results";

const searchClient = algoliasearch(
  "4WWZ0EQ1ZQ",
  "90048574fdaba4da82f82d5d9a0159e5"
);

export default function Search({
  map,
  setMap,
}: {
  map: mapboxgl.Map | undefined;
  setMap: Dispatch<SetStateAction<mapboxgl.Map | undefined>>;
}) {
  const [inpValue, setInpValue] = useState<string | null>(null);
  const setPeople = useSetRecoilState(peopleAtom);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  useEffect(() => {
    if (!inpValue) return;
    const index = searchClient.initIndex("FrontendEngineer_Maps");
    setLoading(true);
    index
      .search(inpValue, {
        headers: {
          "X-Algolia-Application-Id": "4WWZ0EQ1ZQ",
          "X-Algolia-API-Key": "90048574fdaba4da82f82d5d9a0159e5",
        },
      })
      .then(({ hits }) => {
        let hitsArray = hits as HitType[];
        hitsArray = hitsArray.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setPeople(() => {
          const resp = hitsArray.map((hitObj) => ({
            id: hitObj.id,
            photo: hitObj.photo,
            fullName: hitObj.fullName,
            email: hitObj.email,
            "location.city": hitObj["location.city"],
            "location.country": hitObj["location.country"],
            "location.lat": hitObj["location.lat"],
            "location.lng": hitObj["location.lng"],
            "location.state": hitObj["location.state"],
            companyName: hitObj.companyName,
            designation: hitObj.designation,
            gender: hitObj.gender,
          }));
          return resp;
        });
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inpValue]);
  return (
    <div className="fixed z-50 top-5 left-5">
      <SearchBar
        showResults={showResults}
        setShowResults={setShowResults}
        value={inpValue}
        setValue={setInpValue}
        loading={loading}
      />
      <Results
        map={map}
        showResults={showResults}
        setShowResults={setShowResults}
      />
      {/* <InstantSearch
        searchClient={searchClient}
        indexName="FrontendEngineer_Maps"
      >
        <Configure hitsPerPage={5} />
        <div className="ais-InstantSearch">
          <SearchBox
            className="w-[500px]"
            onChangeCapture={(e) => {
              if (e.type === "change") {
                // @ts-expect-error - TS doesn't know about the value property
                setInpValue(e.target.value);
              }
            }}
            onResetCapture={() => {
              setInpValue(null);
            }}
          />
          {inpValue && <Hits hitComponent={Hit} />}
        </div>
      </InstantSearch> */}
    </div>
  );
}
