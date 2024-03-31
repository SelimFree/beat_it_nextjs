import BeatForm from "@/components/beatForm/BeatForm";
import React from "react";
import { auth } from "@/lib/auth";
import { getBeat } from "@/lib/data";

export const metadata = {
  title: "Edit beat",
};

async function EditBeat({ params }) {
  const beatId = params.id;
  const beat = await getBeat(beatId);
  const session = await auth();
  return (
    <>
      <BeatForm user={session?.user} beat={beat} />
    </>
  );
}

export default EditBeat;
