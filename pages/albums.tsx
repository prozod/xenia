import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import Album, { IAlbum } from "../src/components/album/album.component";
import NewAlbumForm from "../src/components/album/albumSubmission.component";
import useOutside from "../src/hooks/useOutside";
import { getAllAlbums } from "../src/services/album/album.service";

export interface ISong {
  trackNum: number;
  trackName: string;
}

const Albums = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery(["all-albums"], () => getAllAlbums(), {
    staleTime: 30 * 1000,
  });
  console.log(data);

  return (
    <section className="box">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Albums</h1>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="flex gap-2 text-sm items-center" asChild>
            <button
              className={`border-[0.25px] disabled:cursor-not-allowed  border-white/10 hover:border-indigo-400/50 py-1 px-3 rounded-full cursor-pointer  
           transition-all`}
            >
              <PlusIcon /> Add album
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-primary-800/30 backdrop-blur-sm absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-30">
              <Dialog.Content
                className="flex justify-center items-center "
                onPointerDownOutside={(e) => e.preventDefault()}
              >
                <NewAlbumForm />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {isLoading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
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
