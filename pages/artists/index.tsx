import * as Dialog from "@radix-ui/react-dialog"
import { useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import React, { useState } from "react"
import { z } from "zod"
import { dashedQueryParams } from "../../src/components/album/album.component"
import Button from "../../src/components/button/button.component"
import Form from "../../src/components/form/form.component"
import { ARTIST_QUERY_FN, ARTIST_QUERY_KEY } from "../../src/services/artist/artist.service"

var a
function test() {
	return "a"
}

export const artistSchema = z.object({
	name: z.string().refine((str) => str.length > 1, "Name field is empty."),
	description: z
		.string()
		.min(16)
		.refine((str) => str.length > 1, "Description field is empty."),
})

function ArtistPage() {
	const { data, isLoading } = useQuery(ARTIST_QUERY_KEY.ALL, ARTIST_QUERY_FN.ALL)
	const [open, setOpen] = useState(false)
	const [showError, setShowError] = useState({ message: "", path: "" })
	const [artistInfo, setArtistInfo] = useState({ name: "", description: "" })

	const mutation = useMutation<any, any, any>({
		mutationFn: (data) => ARTIST_QUERY_FN.ADD(data),
	})

	const onFileSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
		const parsedArtistInfo = artistSchema.safeParse({ ...artistInfo })
		if (!parsedArtistInfo.success) {
			let error = JSON.parse(parsedArtistInfo.error.message)[0]
			setShowError(() => ({ message: error.message, path: error.path }))
		} else {
			mutation.mutate(parsedArtistInfo.data) // post request
		}
	}

	if (isLoading) return <div>LOADING...</div>

	return (
		<section className="box flex justify-center flex-col items-center ">
			<div className="flex items-center gap-4 justify-between w-full mb-4">
				<p className="text-2xl">Artists</p>
				<Dialog.Root
					open={open}
					onOpenChange={setOpen}
				>
					<Dialog.Trigger
						className="flex gap-2 text-sm items-center"
						asChild
					>
						<button
							className={`border-[0.25px] disabled:cursor-not-allowed  border-white/10 hover:border-indigo-400/50 py-1 px-3 rounded-full cursor-pointer  
           transition-all`}
						>
							Create new artist
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="bg-primary-800/30 backdrop-blur-sm absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-30">
							<Dialog.Content
								className="flex justify-center items-center "
								onPointerDownOutside={(e) => e.preventDefault()}
							>
								<Form
									onSubmit={onFileSubmit}
									className="w-screen lg:w-[36vw] h-auto"
								>
									<h1 className="text-center mb-8">Add a new artist</h1>
									<Form.Group>
										<Form.Input
											placeholder=""
											name="name"
											type="text"
											value={artistInfo.name}
											onChange={(e) =>
												setArtistInfo({
													...artistInfo,
													[e.target.name]: e.target.value,
												})
											}
										/>
										<Form.Label
											text="Artist name"
											htmlFor="artistname"
										/>
										{showError.message.length > 1 && showError.path[0] === "name" && (
											<span className="text-xs font-bold text-red-400 mb-4">
												{showError.message}
											</span>
										)}
									</Form.Group>
									<Form.Group>
										<textarea
											placeholder="Informations about the artist..."
											name="description"
											value={artistInfo.description}
											required
											id="description"
											rows={4}
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-primary-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-52"
											onChange={(e) =>
												setArtistInfo({
													...artistInfo,
													[e.target.name]: e.target.value,
												})
											}
										>
											text=testing123
										</textarea>
										<Form.Label
											text="Description"
											htmlFor="description"
										/>
										{showError.message.length > 1 && showError.path[0] === "description" && (
											<span className="text-xs font-bold text-red-400 mb-4">
												{showError.message}
											</span>
										)}
									</Form.Group>
									<div className="flex justify-between gap-4">
										<Button.GradientOutline
											expand
											type="submit"
											text="Add new artist"
										/>
										<Dialog.Close className="flex-1">
											<Button.Outline
												expand
												text="Close"
											/>
										</Dialog.Close>
									</div>
								</Form>
							</Dialog.Content>
						</Dialog.Overlay>
					</Dialog.Portal>
				</Dialog.Root>
			</div>
			<table className="table w-2/4 border-collapse">
				<thead className="table-header-group">
					<tr className="table-row">
						<th className="table-cell p-2 bg-neutral-900 border border-neutral-800">No.</th>
						<th className="table-cell p-2 bg-neutral-900 border border-neutral-800">Name</th>
					</tr>
				</thead>
				<tbody className="table-row-group">
					{data?.map((artist, idx) => {
						return (
							<tr
								key={artist.id}
								className="table-row"
							>
								<td className="table-cell p-2  bg-neutral-900 border border-neutral-800">{idx + 1}</td>
								<td className="table-cell p-2 bg-neutral-900 border border-neutral-800">
									<Link href={`/artist/${dashedQueryParams(artist.name)}`}>
										<span className="hover:text-indigo-400 cursor-pointer transition-all">
											{artist.name}
										</span>
									</Link>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</section>
	)
}

export default ArtistPage
