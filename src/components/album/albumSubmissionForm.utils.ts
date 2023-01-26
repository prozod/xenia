import { z } from "zod"

export type ArtistSelectOpts = {
	value: string
	label: string
}

export const genreOptions = [
	"Pop",
	"Rock",
	"Jazz",
	"Hip-Hop/Rap",
	"Soul & RnB",
	"Country",
	"Electronic",
	"Gospel",
	"Ballad",
	"Folk",
	"Raggae",
	"Funk",
	"Indie",
	"Disco",
	"Instrumental",
	"Experimental",
]

export const genreSelectOptions = Array.from(
	genreOptions,
	(genre) => {
		return { value: genre, label: genre }
	},
	[]
)
const MB_BYTES = 1000000 // no bytes in a megabyte
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const albumSchema = z.object({
	title: z.string().refine((str) => str.length > 1, "Title field is empty."),
	label: z.string().refine((str) => str.length > 1, "Label field is empty."),
	genres: z.array(z.string()).refine((arr) => arr.length >= 1, "You need to provide a genre for this album."),
	artists: z
		.array(z.string())
		.refine((arr) => arr.length >= 1, "You need to provide at least one artist for this album."),
	cover: z
		.any()
		.refine((file) => file?.length == 1, "An album cover is required.")
		.superRefine((file, ctx) => {
			if (file) {
				let f = file[0]
				if (!ACCEPTED_MIME_TYPES.includes(f?.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `File must be one of [${ACCEPTED_MIME_TYPES.join(", ")}] but was ${f?.type}`,
					})
				}
				if (f?.size > 3 * MB_BYTES) {
					ctx.addIssue({
						code: z.ZodIssueCode.too_big,
						type: "array",
						message: `The file must not be larger than ${3 * MB_BYTES} bytes (3MB).`,
						maximum: 3 * MB_BYTES,
						inclusive: true,
					})
				}
			}
		}),
	songs: z
		.array(
			z.object({
				trackNum: z.number().nonnegative(),
				trackName: z.string().trim().min(3),
			})
		)
		.refine((arr) => arr.length >= 1, "Song list cannot be empty."),
})

export type AlbumInfoType = z.infer<typeof albumSchema>
