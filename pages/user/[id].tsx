import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/router"
import { USER_QUERY_FN, USER_QUERY_KEY } from "../../src/services/user/user.service"

const UserProfile = () => {
	const {
		query: { id },
	} = useRouter()

	const { data } = useQuery([USER_QUERY_KEY.SINGLE, id], () => USER_QUERY_FN.SINGLE(id as string), {
		enabled: !!id,
		staleTime: 10 * 1000,
	})

	console.log("getUserProfile Data: ", data)
	return (
		<main className="box">
			<div className=" flex gap-4 items-center bg-primary-800/60 backdrop-blur-md border-[0.5px] border-indigo-400/40 p-4 rounded-md">
				<Image
					src={data?.image}
					layout="intrinsic"
					width={75}
					height={75}
					alt={data?.name}
					className="rounded-full"
				/>
				<div>
					<h1 className="font-bold">{data?.name}</h1>
					<h1 className="text-sm text-white/60">{data?.email}</h1>
				</div>
			</div>
		</main>
	)
}

export default UserProfile
