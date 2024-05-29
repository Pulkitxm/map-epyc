"use client";

import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "./Hit";
import { useState } from "react";

const searchClient = algoliasearch(
  "4WWZ0EQ1ZQ",
  "90048574fdaba4da82f82d5d9a0159e5"
);

export default function Search() {
  const [inpValue, setInpValue] = useState<string | null>(null);
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
