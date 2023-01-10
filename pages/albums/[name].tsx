import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Album from "../../src/components/album/album.component";
import { getAlbum } from "../../src/services/album/album.service";

function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery(
    ["album"],
    () => getAlbum(id as string),
    {
      // staleTime: 30 * 1000,
    }
  );
  console.log("useRouter result albumId", id);

  console.log("albumdata", data);

  return (
    <div>
      {isLoading && <p>hol up bitch</p>}
      {data && (
        <>
          <p>
            You visited {router.query.name}, with ID: {router.query.id}
          </p>
          <div className="h-64 w-64">
            <Album.Tile key={data.d} album={data} />
          </div>
        </>
      )}
    </div>
  );
}

export default AlbumPage;
