export interface IArtistResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  dob: string;
  description: {
    biography: string;
  };
}
