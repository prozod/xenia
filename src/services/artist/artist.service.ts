export const getArtists = async () => {
  const res = await fetch(`/api/artist?all`);
  if (!res.ok) {
    throw new Error(`An error occured in getArtists fn`);
  }
  const data = await res.json();
  return data;
};

export const getArtist = async (name: string) => {
  const res = await fetch(`/api/artist?name=${name}`);
  if (!res.ok) {
    throw new Error(`An error occured in getArtist fn`);
  }
  const data = await res.json();
  return data;
};

export const getAllArtists = async () => {
  const res = await fetch(`/api/artist?all`);
  if (!res.ok) {
    throw new Error(`An error occured in getAllArtists fn`);
  }
  const data = await res.json();
  return data;
};
