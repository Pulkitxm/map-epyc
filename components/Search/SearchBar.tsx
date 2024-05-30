"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import IconSearch from "@/components/Icons/SearchIcon";
import LoadingIcon from "../Icons/LoadingIcon";
import IconClose from "../Icons/CrossIcon";

export default function SearchBar({
  value,
  setValue,
  loading,
  showResults,
  setShowResults,
}: {
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  function highlightSearchBar() {
    searchRef.current?.focus();
  }
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  });
  return (
    <div
      className="fixed top-0 left-0 md:top-6 md:left-6 w-screen md:w-[500px] h-14 bg-white rounded-xl flex items-center px-5 space-x-3 cursor-text"
      onClick={highlightSearchBar}
    >
      {loading ? <LoadingIcon /> : <IconSearch className="cursor-pointer" />}
      {value ? (
        <>
          <input
            ref={searchRef}
            type="text"
            className="flex-grow outline-none border-none"
            placeholder="Search Members"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              !showResults&&setShowResults(true);
            }}
            onMouseDown={() => setShowResults(true)}
          />
          <IconClose
            onClick={() => setValue(null)}
            className="cursor-pointer"
          />
        </>
      ) : (
        <input
          ref={searchRef}
          type="text"
          className="flex-grow outline-none border-none"
          placeholder="Search Members"
          value={""}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}
