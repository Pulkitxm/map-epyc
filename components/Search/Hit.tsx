import { Highlight } from "react-instantsearch";
import { Hit as AlgoliaHit } from "instantsearch.js";
import Image from "next/image";
import IconUser from "../Icons/UserIcon";

interface Props {
  hit: AlgoliaHit<{
    photo: string;
    fullName: string;
    location: {
      city: string;
      country: string;
    };
  }>;
}

export const Hit = ({ hit }: Props) => {
  return (
    <article className="flex text-black">
      {hit.photo ? (
        <Image
          src={hit.photo}
          alt={hit.fullName}
          width={50}
          height={50}
          className="rounded-full"
        />
      ) : (
        <IconUser className="w-16 h-16 ml-3 opacity-60" />
      )}
      <div className="hit-fullName">
        <Highlight attribute="fullName" hit={hit} />
      </div>
      <div className="hit-location.city">
        <Highlight attribute={["location.city"]} hit={hit} />
      </div>
      <div className="hit-location.country">
        <Highlight attribute={["location.country"]} hit={hit} />
      </div>
    </article>
  );
};
