import Link from "next/link"
import React from "react"
import { IAlbum } from "../../../pages/api/albums"

export function dashedQueryParams(text: string) {
	if (text) return text.toLowerCase().split(" ").join("-").trim()
}

const Album = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 auto-rows-auto col-auto">
			{children}
		</div>
	)
}

Album.Tile = function AlbumTile({ album }: { album: IAlbum }) {
	return (
		<Link
			href={{
				pathname: `/artist/[name]`,
				query: {
					name: album?.artists[0]?.name,
					album: dashedQueryParams(album?.title),
				},
			}}
			as={`/artist/${dashedQueryParams(album.artists[0]?.name)}?album=${dashedQueryParams(album.title)}`}
		>
			<div className="z-30 w-full h-full bg-gradient-to-r from-primary-800 to-primary-900 border-[0.5px] border-white/10 hover:border-indigo-400/40 aspect-square rounded-md relative flex items-end cursor-pointer group">
				<div className="w-full p-4 group-hover:-translate-y-2 transition-all">
					<h1 className="text-xl font-bold">{album.title}</h1>
					<p className="text-white/70 group-hover:text-indigo-400">
						by{" "}
						{album.artists.map((artist) => (
							<Link
								key={artist.name}
								href={`/artist/${dashedQueryParams(artist.name)}`}
								passHref
							>
								<span className="hover:text-white">{artist.name}</span>
							</Link>
						))}
					</p>
				</div>
				<span className="z-[-10] bg-gradient-to-t from-zinc-900 to-transparent w-full h-full absolute inset-0 rounded-md"></span>
				<span
					className="transition-opacity group-hover:opacity-100 z-[-99] opacity-70 absolute inset-0 h-full w-full rounded-md bg-no-repeat bg-cover bg-center"
					style={{ backgroundImage: `url(${album.cover})` }}
				></span>
			</div>
		</Link>
	)
}

export default Album
