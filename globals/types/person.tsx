export type Person = {
  id: number;
  photo: string;
  fullName: string;
  email: string;
  gender: string;
  "location.lat": number | string;
  "location.lng": number | string;
  companyName: string;
  designation: string;
  "location.city": string;
  "location.state": string;
  "location.country": string;
};

export type HitType = {
  id: number;
  photo: string;
  fullName: string;
  email: string;
  gender: string;
  "location.lat": number | string;
  "location.lng": number | string;
  "location.city": string;
  "location.state": string;
  "location.country": string;
  companyName: string;
  designation: string;
  objectID: string;
  _highlightResult: {
    fullName: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    location: {
      city: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
      country: {
        value: string;
        matchLevel: string;
        matchedWords: string[];
      };
    };
  };
};
