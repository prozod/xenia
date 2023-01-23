import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { dashedQueryParams } from "../../src/components/album/album.component";
import Button from "../../src/components/button/button.component";
import { getAllArtists } from "../../src/services/artist/artist.service";

function ArtistPage() {
  const { data, isLoading } = useQuery(["all-artists"], () => getAllArtists());
  if (isLoading) return <div>LOADING...</div>;
  console.log("Artists all query", data);
  return (
    <section className="box flex justify-center flex-col items-center ">
      <div className="flex items-center gap-4 justify-between w-full mb-4">
        <p className="text-2xl">Artists</p>
        <Button.Outline text="Create new artist" />
      </div>
      <table className="table w-2/4 border-collapse">
        <thead className="table-header-group">
          <tr className="table-row">
            <th className="table-cell p-2 bg-neutral-900 border border-neutral-800">
              No.
            </th>
            <th className="table-cell p-2 bg-neutral-900 border border-neutral-800">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="table-row-group">
          {data?.map((artist, idx) => {
            return (
              <tr key={artist.id} className="table-row">
                <td className="table-cell p-2  bg-neutral-900 border border-neutral-800">
                  {idx + 1}
                </td>
                <td className="table-cell p-2 bg-neutral-900 border border-neutral-800">
                  <Link href={`/artist/${dashedQueryParams(artist.name)}`}>
                    <span className="hover:text-indigo-400 cursor-pointer transition-all">
                      {artist.name}
                    </span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default ArtistPage;
