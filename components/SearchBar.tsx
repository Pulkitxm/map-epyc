"use client";

import React, { useRef } from "react";
import IconSearch from "./Icons/SearchIcon";

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  function highlightSearchBar() {
    searchRef.current?.focus();
  }
  return (
    <div
      className="fixed top-0 left-0 md:top-6 md:left-6 w-screen md:w-[500px] h-14 bg-white rounded-xl flex items-center px-5 space-x-3 cursor-text"
      onClick={highlightSearchBar}
    >
      <IconSearch className="cursor-pointer" />
      <input
        ref={searchRef}
        type="text"
        className="flex-grow outline-none border-none"
        placeholder="Search Members"
      />
    </div>
  );
}
