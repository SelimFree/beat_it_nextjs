import BeatForm from "@/components/beatForm/BeatForm";
import React from "react";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "New beat",
};

async function NewBeat() {
  const session = await auth();
  return (
    <>
      <BeatForm user={session?.user} />
    </>
  );
}

export default NewBeat;
