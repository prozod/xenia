import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    dashedQueryParams,
    IAlbum
} from "../../src/components/album/album.component";
import { IArtist } from "../../src/components/artist/artist.component";
import Button from "../../src/components/button/button.component";
import {
    ALBUM_QUERY_FN,
    ALBUM_QUERY_KEY
} from "../../src/services/album/album.service";

import {
    ARTIST_QUERY_FN,
    ARTIST_QUERY_KEY
} from "../../src/services/artist/artist.service";

const ArtistPage = () => {
  const router = useRouter();
  const mutation = useMutation<any, any, any>(ALBUM_QUERY_FN.DELETE);
  const artistQuery = useQuery(
    ARTIST_QUERY_KEY.SINGLE,
    () => ARTIST_QUERY_FN.SINGLE(router.query.name as string),
    {
      enabled: Boolean(router.query.name),
    }
  );
  const albumQuery = useQuery<string[], IAlbum, IAlbum>(
    ALBUM_QUERY_KEY.SINGLE,
    () => ALBUM_QUERY_FN.SINGLE(router.query.album as string),
    {
      enabled: Boolean(router.query.album),
    }
  );
  if (artistQuery.isLoading) {
    return <div>WAIT...</div>;
  }
  if (artistQuery.isError) {
    return <div>ERROR GETTING ARTIST</div>;
  }

  if (!router.query.album) {
    return (
      <>
        <div>
          <h1 className="font-bold text-3xl">{artistQuery?.data?.name}</h1>
          <p className="text-gray-400 w-2/4">
            {artistQuery?.data?.description.biography}
          </p>
          <div>
            <h2 className="font-bold text-3xl">Albums</h2>
            {artistQuery?.data?.albums?.map((album: IAlbum) => {
              return (
                <div
                  key={album.id}
                  className="flex flex-row items-center gap-4 my-2"
                >
                  <Image
                    className="rounded-md"
                    layout="intrinsic"
                    src={`${album.cover}`}
                    alt={album.title}
                    width={50}
                    height={50}
                  />
                  <Link
                    href={{
                      pathname: `/artist/[name]`,
                      query: {
                        name: artistQuery?.data.name.toLowerCase().trim(),
                        album: dashedQueryParams(album?.title),
                      },
                    }}
                    as={`/artist/${dashedQueryParams(
                      artistQuery?.data?.name
                    )}?album=${dashedQueryParams(album?.title)}`}
                  >
                    <p>{album.title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  if (albumQuery.isLoading) {
    return <div>WAIT...</div>;
  }
  if (albumQuery.isError) {
    return <div>ERROR GETTING ALBUM</div>;
  }

  return (
    <>
      {albumQuery.data && (
        <section className="box my-4">
          <div className="flex grow">
            <div>
              <Image
                className="rounded-md"
                src={albumQuery?.data.cover}
                alt={albumQuery?.data.title}
                layout="intrinsic"
                width={300}
                height={300}
              />
              <div className="flex gap-2">
                <Button.Outline text="Edit album information" />
                <Button.Outline
                  text="Remove"
                  onClick={() => mutation.mutate(albumQuery?.data.id)}
                />
              </div>
            </div>
            <div className="flex flex-col mx-4 w-full">
              <h1 className="text-3xl">{albumQuery?.data.title}</h1>
              {albumQuery?.data.artists.map((artist: IArtist) => (
                <Link
                  key={artist.id}
                  href={`/artist/${dashedQueryParams(artist.name)}`}
                  passHref
                >
                  <span className="text-md mb-2 font-semibold hover:text-indigo-400 cursor-pointer transition-all">
                    {artist.name}
                  </span>
                </Link>
              ))}
              <table className="table w-2/4 border-collapse">
                <thead className="table-header-group">
                  <tr className="table-row">
                    <th className="table-cell p-2 bg-neutral-900 border border-neutral-800">
                      No.
                    </th>
                    <th className="table-cell p-2 bg-neutral-900 border border-neutral-800">
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group">
                  {albumQuery?.data.tracks.map((track, idx: number) => {
                    return (
                      <tr key={track.id} className="table-row">
                        <td className="table-cell p-2  bg-neutral-900 border border-neutral-800">
                          {idx + 1}
                        </td>
                        <td className="table-cell p-2 bg-neutral-900 border border-neutral-800">
                          {track.title}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ArtistPage;
