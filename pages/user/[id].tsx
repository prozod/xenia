import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import React from "react";
import { getUserProfile } from "../../src/utils/getUserProfile";

const UserProfile = ({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = useQuery(["user-profile", params.id], () =>
    getUserProfile({ userId: params.id })
  );

  console.log("TANSTACK DATA", data);
  return (
    <main className="box">
      {data && (
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
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default UserProfile;
