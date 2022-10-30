export interface IArtist {
  id: string;
  name: string;
  description: {
    biography: string;
  };
  dob: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
