"use client";

import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "./Hit";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { peopleAtom } from "@/globals/state/people";
import LocalPeople from "@/data/people";

const searchClient = algoliasearch(
  "4WWZ0EQ1ZQ",
  "90048574fdaba4da82f82d5d9a0159e5"
);

export default function Search() {
  const [inpValue, setInpValue] = useState<string | null>(null);
  const setPeople = useSetRecoilState(peopleAtom);
  useEffect(() => {
    if (!inpValue) return;
    const index = searchClient.initIndex("FrontendEngineer_Maps");
    index
      .search(inpValue, {
        headers: {
          "X-Algolia-Application-Id": "4WWZ0EQ1ZQ",
          "X-Algolia-API-Key": "90048574fdaba4da82f82d5d9a0159e5",
        },
      })
      .then(({ hits }) => {
        setPeople(() => {
          return LocalPeople.filter((person) =>
            // @ts-expect-error - TS doesn't know about the id property
            hits.some((hit) => hit.id === person.id)
          );
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inpValue]);
  return (
    <div className="fixed z-50 top-5 left-5 ">
      <InstantSearch
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
      </InstantSearch>
    </div>
  );
}
