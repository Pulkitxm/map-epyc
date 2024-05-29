import { atom } from "recoil";
import { Person } from "../types/person";

export const peopleAtom = atom<Person[]>({
  key: "people",
  default: [],
});