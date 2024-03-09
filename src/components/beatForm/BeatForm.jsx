import { createBeat } from "@/lib/actions";
import React from "react";

function BeatForm({ id }) {
  return (
    <div className="px-4 py-16 flex flex-col gap-4 items-center h-full">
      <h2 className="text-2xl font-semibold mt-4 lg:mt-0">
        Share your talent!
      </h2>
      <form
        action={createBeat}
        className="flex flex-col gap-4 w-full lg:w-[40rem] h-full"
      >
        <div>
          <h4>Title</h4>
          <input
            type="text"
            name="title"
            className="w-full rounded-[5px] text-md"
          />
          <span className="text-light-red">Invalid title</span>
        </div>
        <div>
          <h4>Description</h4>
          <textarea
            name="description"
            cols="30"
            rows="10"
            className="w-full"
          ></textarea>
          <span className="text-light-red">Invalid title</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-auto lg:mb-4">
          <div className="flex flex-col">
            <h4>Cover image</h4>
            <input
              type="file"
              name="cover"
              accept="image/png, image/jpg, image/jpeg"
            />
            <span className="text-light-red">Invalid title</span>
          </div>
          <div className="flex flex-col">
            <h4>Audio file</h4>
            <input type="file" name="audio" accept="audio/mp3" />
            <span className="text-light-red">Invalid title</span>
          </div>
        </div>
        <input type="hidden" value={"65e343b64b77d739e4a8a680"} name="userId"/>
        <button>Create a beat</button>
      </form>
    </div>
  );
}

export default BeatForm;
