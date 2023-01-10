export const getAllAlbums = async () => {
  const res = await fetch(`/api/albums`);
  if (!res.ok) {
    throw new Error(`An error occured in getAllAlbum fn`);
  }
  const data = await res.json();
  return data;
};

export const getAlbum = async (query: string) => {
  console.log("getAlbum Q", query);
  const res = await fetch(`/api/albums?id=${query}`);
  if (!res.ok) {
    throw new Error(`An error occured in getAlbum fn`);
  }
  const data = await res.json();
  return data;
};

export const postNewAlbum = async (data: any) => {
  console.log("postNewAlbum Fn:", "/api/albums", data);
  const res = await fetch("api/albums", {
    headers: {
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST", // was put
    credentials: "include",
    mode: "cors",
    body: data,
  });
  return res;
};
