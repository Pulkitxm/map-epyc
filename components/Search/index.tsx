"use client";

import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "./Hit";
import "./Hit.css";

const searchClient = algoliasearch(
  "4WWZ0EQ1ZQ",
  "90048574fdaba4da82f82d5d9a0159e5"
);

export default function Search() {
  return (
    <div className="fixed z-50 top-5 left-5 ">
      <InstantSearch
        searchClient={searchClient}
        indexName="FrontendEngineer_Maps"
      >
        <Configure hitsPerPage={5} />
        <div className="ais-InstantSearch">
          <SearchBox className="w-[500px]" />
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
}
