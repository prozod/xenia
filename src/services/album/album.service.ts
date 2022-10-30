export const getAllAlbums = async () => {
  const res = await fetch(`/api/albums`);
  if (!res.ok) {
    throw new Error(`An error occured in getAllAlbum fn`);
  }
  const data = await res.json();
  return data;
};
