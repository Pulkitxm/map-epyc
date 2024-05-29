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