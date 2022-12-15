export const getArtists = async () => {
  const res = await fetch(`/api/artist?all`);
  if (!res.ok) {
    throw new Error(`An error occured in getArtists fn`);
  }
  const data = await res.json();
  return data;
};
