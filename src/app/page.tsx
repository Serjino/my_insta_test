"use server";
import React from "react";
import { GET } from "../api/api";
import { IPhoto } from "../global/types";
import { PhotoList } from "../components/PhotoList/PhotoList";

export default async function Page() {

  const PHOTO_LIST: IPhoto[] = await GET({
    path: '/photos'
  })

  console.log(PHOTO_LIST)

  return (
    <main>
      <PhotoList data={PHOTO_LIST} />
    </main>
  );
}
