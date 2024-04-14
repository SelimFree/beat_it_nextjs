"use client";

import BeatCard from "@/components/beatCard/BeatCard";
import BeatPlayer from "@/components/beatPlayer/BeatPlayer";
import { handleLoadMoreBeats } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";

function BeatList({ data, user }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(null);
  const [formState, formAction] = useFormState(handleLoadMoreBeats, data);
  const [page, setPage] = useState(2);
  const audioRef = useRef();

  const initBeat = (beat) => {
    setCurrentBeat((prev) => {
      return {
        ...prev,
        ...beat,
      };
    });
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const nextBeat = () => {
    const currentBeatIndex = data?.indexOf(
      data?.find((el) => el?._id === currentBeat?._id)
    );
    console.log("Current index: ", currentBeatIndex);
    if (currentBeatIndex === -1) {
      return;
    }

    let nextBeatIndex = currentBeatIndex + 1;

    if (nextBeatIndex > data?.length - 1) {
      nextBeatIndex = 0;
    }
    console.log("Next index: ", nextBeatIndex);
    console.log("Data length: ", data.length);

    initBeat(data?.at(nextBeatIndex));
  };

  const prevBeat = () => {
    const currentBeatIndex = data?.indexOf(
      data?.find((el) => el?._id === currentBeat?._id)
    );
    console.log("Current index: ", currentBeatIndex);
    if (currentBeatIndex === -1) {
      return;
    }

    let prevBeatIndex = currentBeatIndex - 1;

    if (prevBeatIndex < 0) {
      prevBeatIndex = data?.length - 1;
    }
    console.log("Prev index: ", prevBeatIndex);
    console.log("Data length: ", data.length);

    initBeat(data?.at(prevBeatIndex));
  };

  const loadMore = (formData) => {
    formAction(formData);
    setPage((prev) => {
      return prev + 1;
    });
  };

  return (
    <>
      <div className="w-full px-4 py-16 flex flex-col gap-4 items-center">
        {formState.map((el, i) => {
          return (
            <BeatCard
              key={i}
              beat={el}
              editable={user?.email === el?.userId?.email}
              user={user?.email}
              playerParams={{
                isPlaying,
                isOpen,
                onOpen,
                currentBeat,
                initBeat,
                audioRef,
              }}
            />
          );
        })}
        {formState?.length ? (
          <form action={loadMore}>
            <input type="hidden" name="page" value={page} />
            <button>More</button>
          </form>
        ) : (
          <div className="w-full h-[80vh] flex items-center justify-center">
            <h3 className="font-bold text-lg">Nothing to show =(</h3>
          </div>
        )}
      </div>
      <BeatPlayer
        playerParams={{
          isPlaying,
          setIsPlaying,
          isOpen,
          onClose,
          currentBeat,
          setCurrentBeat,
          audioRef,
          nextBeat,
          prevBeat,
        }}
      />
    </>
  );
}

export default BeatList;
