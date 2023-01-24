import * as Dialog from "@radix-ui/react-dialog"
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React, { useRef, useState } from "react"
import { ALBUM_QUERY_FN } from "../../services/album/album.service"
import { ARTIST_QUERY_FN, ARTIST_QUERY_KEY } from "../../services/artist/artist.service"
import { IArtistResponse } from "../artist/artist.types"
import Button from "../button/button.component"
import Form from "../form/form.component"
import { CustomSelect } from "../select/select.component"
import { selectMenuStyles } from "../select/select.styles"
import { AlbumInfoType, albumSchema, ArtistSelectOpts, genreSelectOptions } from "./albumSubmission.utils"

function NewAlbumForm() {
	const [song, setSong] = useState<string>("")
	const [showError, setShowError] = useState<string>("")
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [imgPreviewUrl, setImgPreviewUrl] = useState<string>()
	const [albumInfo, setAlbumInfo] = useState<AlbumInfoType>({
		title: "",
		label: "",
		artists: [""],
		genres: [""],
		cover: undefined,
		songs: [
			{ trackNum: 1, trackName: "Woes and foes" },
			{ trackNum: 2, trackName: "Come and go" },
			{ trackNum: 3, trackName: "Chronos" },
		],
	})

	function addSong() {
		if (song !== undefined && song !== "" && song.trim().length >= 1) {
			setAlbumInfo({
				...albumInfo,
				songs: [
					...albumInfo.songs,
					{
						trackNum: albumInfo.songs.length + 1,
						trackName: song,
					},
				],
			})
			setSong(() => "")
		}
	}

	function removeSong(e: React.FormEvent<HTMLButtonElement>) {
		const newSongList = albumInfo.songs.filter((song) => song.trackNum !== Number(e.currentTarget.dataset.id))

		newSongList.forEach((s, i) => {
			s.trackNum = i + 1
		})

		setAlbumInfo({
			...albumInfo,
			songs: [...newSongList],
		})
	}

	// invoke db mutation fn -> cb (POST)
	const mutation = useMutation<any, any, any>({
		mutationFn: (data) => ALBUM_QUERY_FN.ADD(data),
	})

	// submit form action
	const onFileSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()

		const parsedAlbumInfo = albumSchema.safeParse({ ...albumInfo })
		if (!parsedAlbumInfo.success) {
			let error = JSON.parse(parsedAlbumInfo.error.message)[0]
			setShowError(() => error.message)
			console.log(showError)
		}

		const formData = new FormData()
		const albumData = new Blob([JSON.stringify(parsedAlbumInfo)], {
			type: "application/json",
		})

		formData.append("album-image", fileInputRef.current?.files?.item(0)!)
		formData.append("album-data", albumData)

		// mutation.mutate(formData); // post request
	}

	// create image thumbnail preview of uploaded cover
	function processImageThumbnail() {
		const files = fileInputRef?.current?.files
		const imgUrl = URL.createObjectURL(files?.item(0)!)
		setImgPreviewUrl(URL.createObjectURL(files?.item(0)!))
		setAlbumInfo({
			...albumInfo,
			cover: files,
		})
		URL.revokeObjectURL(imgUrl)
	}

	// query and display artists in the select menu
	const { data: artists } = useQuery<IArtistResponse[]>(ARTIST_QUERY_KEY.ALL, ARTIST_QUERY_FN.ALL, {
		staleTime: 30 * 1000,
	})

	let artistSelectOptions: ArtistSelectOpts[] = []

	if (artists) {
		artists.map((artist) =>
			artistSelectOptions.push({
				value: artist.id,
				label: artist.name,
			})
		)
	}

	return (
		<Form
			onSubmit={onFileSubmit}
			className="w-screen lg:w-[40vw] h-auto"
		>
			<h1 className="text-center mb-8">Add a new album</h1>
			<div className="flex gap-4">
				<div className="flex-1">
					<Form.Group>
						<Form.Input
							placeholder="Title"
							type="text"
							name="title"
							aria-labelledby="Album title"
							autoComplete="off"
							onChange={(e) =>
								setAlbumInfo({
									...albumInfo,
									[e.currentTarget.name]: e.currentTarget.value,
								})
							}
						/>
						<Form.Label
							text="Title"
							htmlFor="album-title"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Input
							placeholder="Label"
							type="text"
							name="label"
							aria-labelledby="Record label"
							autoComplete="off"
							onChange={(e) =>
								setAlbumInfo({
									...albumInfo,
									[e.currentTarget.name]: e.currentTarget.value,
								})
							}
						/>
						<Form.Label
							text="Label"
							htmlFor="album-label"
						/>
					</Form.Group>
					<Form.Group>
						{imgPreviewUrl && (
							<Image
								layout="fixed"
								alt="text"
								src={imgPreviewUrl}
								width={100}
								height={100}
								className="rounded-md"
							/>
						)}
						<Form.Input
							type="file"
							name="filename"
							accept="image/*"
							ref={fileInputRef}
							onChange={processImageThumbnail}
							className="mt-2"
						/>
						<Form.Label
							text=""
							htmlFor="filename"
						/>
					</Form.Group>
					<Form.Group>
						<CustomSelect
							isMulti
							name="artists"
							placeholder={"Pick an artist..."}
							options={artistSelectOptions}
							styles={selectMenuStyles}
							onChange={(e) =>
								setAlbumInfo({
									...albumInfo,
									artists: e.map((artist) => artist.label),
								})
							}
						/>
						<Form.Label
							text=""
							htmlFor="artists"
						/>
					</Form.Group>
					<Form.Group>
						<CustomSelect
							options={genreSelectOptions}
							isMulti
							placeholder={"Pick a genre or more..."}
							name="genre"
							styles={selectMenuStyles}
							onChange={(e) =>
								setAlbumInfo({
									...albumInfo,
									genres: e.map((genre) => genre.value),
								})
							}
						/>
						<Form.Label
							text=""
							htmlFor="genres"
						/>
					</Form.Group>
				</div>
				<div className="flex-1 min-h-full">
					<Form.Group>
						<div className="flex space-between gap-2">
							<Form.Input
								placeholder="Track name..."
								name="songs"
								type="text"
								value={song}
								onChange={(e) => setSong(e.target.value)}
								onKeyDown={(key) => key.code === "Enter" && addSong()}
							/>
							<Form.Label
								text="Songs"
								htmlFor="songs"
							/>
							<Button.Outline
								onClick={addSong}
								onKeyDown={(e) => e.key === "Enter" && addSong()}
								type="button"
								iconRight={<PlusIcon />}
								text="Add"
							/>
						</div>
						<div className="max-h-56 my-2 overflow-y-auto relative flex justify flex-col">
							{albumInfo.songs.length === 0 ? (
								<div className=" flex items-center justify-center w-full h-16">
									<p className="text-white/40 text-sm">No songs added...</p>
								</div>
							) : (
								albumInfo.songs.map((song, idx) => (
									<div
										className="flex gap-2 flex-col group"
										key={idx}
									>
										<div className="flex justify-between items-center group-hover:bg-primary-800 pl-3 pr-1 py-1 rounded-md">
											<p className="text-sm mb-1 group-hover:text-indigo-400">
												<span className="text-white/60">{song.trackNum}: </span>
												{song.trackName}
											</p>
											<button
												aria-label={`delete song number ${song.trackNum}`}
												type="button"
												className="group-hover:text-gray-900 font-bold group-hover:bg-red-300 transition-all p-2 hover:cursor-pointer focus:bg-red-300 focus:text-gray-900 focus:outline-none focus:rounded-sm"
												data-id={song.trackNum}
												onClick={(e) => removeSong(e)}
												onKeyDown={(e) => e.key === "Enter" && removeSong(e)}
											>
												{<Cross1Icon data-id={song.trackNum} />}
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</Form.Group>
				</div>
			</div>
			{showError.length >= 1 && <p className="text-xs font-bold text-red-400 mb-4">{showError}</p>}
			<div className="flex justify-between gap-4">
				<Button.GradientOutline
					expand
					type="submit"
					text="Create new album"
				/>
				<Dialog.Close className="flex-1">
					<Button.Outline
						expand
						text="Close"
					/>
				</Dialog.Close>
			</div>
		</Form>
	)
}

export default NewAlbumForm
