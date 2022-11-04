export const getAllAlbums = async () => {
  const res = await fetch(`/api/albums`);
  if (!res.ok) {
    throw new Error(`An error occured in getAllAlbum fn`);
  }
  const data = await res.json();
  return data;
};

export const postNewAlbum = async (formdata: any) => {
  console.log("postNewAlbum Fn:", "/api/albums", formdata);
  const res = await fetch("api/albums", {
    headers: {
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    method: "PUT",
    credentials: "include",
    mode: "cors",
    body: formdata,
  });
  return res;
};
