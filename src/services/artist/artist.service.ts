import { IArtistResponse } from "../../../pages/api/artist"

export const getArtists = async () => {
	const res = await fetch(`/api/artist?all`)
	if (!res.ok) {
		throw new Error(`An error occured in getArtists fn`)
	}
	const data = await res.json()
	return data
}

export const getArtist = async (name: string) => {
	const res = await fetch(`/api/artist?name=${name}`)
	if (!res.ok) {
		throw new Error(`An error occured in getArtist fn`)
	}
	const data = await res.json()
	return data
}

export const getAllArtists = async () => {
	const res = await fetch(`/api/artist?all`)
	if (!res.ok) {
		throw new Error(`An error occured in getAllArtists fn`)
	}
	const data = await res.json()
	return data
}

export const postNewArtist = async (data: any) => {
	const res = await fetch("/api/artist", {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		method: "POST",
		credentials: "include",
		mode: "cors",
		body: JSON.stringify(data),
	})
	return res
}

export const ARTIST_QUERY_KEY = {
	ALL: ["all-artists"],
	SINGLE: ["artist"],
}
export const ARTIST_QUERY_FN = {
	ALL: () => getAllArtists(),
	SINGLE: (params: string) => getArtist(params),
	ADD: (data: IArtistResponse) => postNewArtist(data),
}
