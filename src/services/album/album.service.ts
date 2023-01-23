export const getAllAlbums = async () => {
  const res = await fetch(`/api/albums`);
  if (!res.ok) {
    throw new Error(`An error occured in getAllAlbum fn`);
  }
  const data = await res.json();
  return data;
};

export const getAlbum = async (query: string) => {
  const res = await fetch(
    `/api/albums?title=${query.split("-").join(" ").toString()}`
  );

  if (!res.ok) {
    throw new Error(`An error occured in getAlbum fn`);
  }
  const data = await res.json();
  return data;
};

export const deleteAlbum = async (query: string) => {
  const res = await fetch(`/api/albums?id=${query}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "DELETE",
    credentials: "include",
    mode: "cors",
  });

  if (!res.ok) {
    throw new Error(`An error occured in deleteAlbum fn`);
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
