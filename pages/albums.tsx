import { useQuery } from "@tanstack/react-query";
import React from "react";
import Album, { IAlbum } from "../src/components/album/album.component";
import { getAllAlbums } from "../src/services/album/album.service";

const Albums = () => {
  const { data, isLoading } = useQuery(["all-albums"], () => getAllAlbums(), {
    staleTime: 30 * 1000,
  });
  console.log("album data:", data);
  return (
    <section className="box">
      <h1 className="text-2xl font-bold pb-8">Albums</h1>
      {isLoading && <div>Loading...</div>}
      <Album>
        {data &&
          data?.map((album: IAlbum) => (
            <Album.Tile key={album.id} album={album} />
          ))}
      </Album>
    </section>
  );
};

export default Albums;
