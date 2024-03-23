"use client";

import { handleCreateBeat } from "@/lib/actions";
import { useFormState } from "react-dom";

function BeatForm({ id, user }) {
  const [formState, formAction] = useFormState(handleCreateBeat, undefined);

  return (
    <div className="px-4 pt-24 pb-16 flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mt-4 lg:mt-0">
        Share your talent!
      </h2>
      <form
        action={formAction}
        className="flex flex-col gap-4 w-full lg:w-[40rem]"
      >
        <div>
          <h4>Title</h4>
          <input
            type="text"
            name="title"
            className="w-full rounded-[5px] text-md"
          />
        </div>
        <div>
          <h4>Description</h4>
          <textarea name="description" rows="8" className="w-full"></textarea>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-auto lg:mb-4">
          <div className="flex flex-col">
            <h4>Cover image</h4>
            <input
              type="file"
              name="cover_create"
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div className="flex flex-col">
            <h4>Audio file</h4>
            <input type="file" name="audio_create" accept="audio/mp3" />
          </div>
        </div>
        <span className={`text-light-red${formState?.error ? "" : " hidden"}`}>
          {formState?.error}
        </span>
        <input type="hidden" value={user?.id} name="userId" />
        <button>Create a beat</button>
      </form>
    </div>
  );
}

export default BeatForm;
