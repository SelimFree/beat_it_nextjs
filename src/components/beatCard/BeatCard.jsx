"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils";
import { useEffect, useState } from "react";
import { handleDeleteBeat, handleUnlike, handleLike } from "@/lib/actions";

function BeatCard({ beat, playerParams, editable, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleDescriptionShow = (e) => {
    e.target.classList.toggle("truncate");
  };

  const handleBeatPlay = (beat) => {
    if (!playerParams.isOpen) {
      playerParams.onOpen();
    }
    playerParams.initBeat(beat);
  };

  const handleDeleteConfirm = async (e, id) => {
    const delBtn = e.target;
    const confirm = parseInt(delBtn.getAttribute("data-confirm"));
    if (confirm) {
      await handleDeleteBeat(id);
      setShowMenu(false);
      window.location.reload();
    } else {
      delBtn.textContent = "Confirm";
      delBtn.setAttribute("data-confirm", 1);
      setTimeout(() => {
        delBtn.textContent = "Delete";
        delBtn.setAttribute("data-confirm", 0);
      }, 3000);
    }
  };

  const handleShare = (e) => {
    console.log("Sharing...");
  };

  const handleLikeUnlike = (id, email) => {
    if (!email) {
      return;
    }

    liked ? handleUnlike(id, email) : handleLike(id, email);
    setLiked((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    setLiked(() => {
      console.log(beat?.liked);
      return beat?.liked;
    });
  }, []);

  return (
    <div className="flex flex-col p-4 bg-white rounded-[10px] max-w-[40rem] w-full">
      <div className="flex">
        <div className="flex mr-auto gap-4 items-center mb-4">
          <div className="relative w-12 h-12 rounded-full">
            <Image
              src={`${beat?.userId?.picture ? beat?.userId.picture : "/assets/avatar.png"}`}
              fill
              alt="Avatar image"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{beat?.userId?.username}</span>
            <span className="font-semibold text-light-blue text-xs">
              {formatDate(beat?.createdAt)}
            </span>
          </div>
        </div>
        <div className="relative flex gap-4">
          <button
            className="h-fit flex justify-center items-center p-2 bg-transparent hover:bg-transparent"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Image
              src="/assets/options.png"
              alt="Options button"
              width={25}
              height={25}
            />
          </button>
          <div
            className={`absolute top-12 right-0 w-24 flex flex-col bg-white shadow-2xl rounded-[10px] z-[2] overflow-hidden transition duration-150 ease-in-out ${
              showMenu ? "scale-100" : "scale-0"
            }`}
          >
            {editable && (
              <>
                <Link
                  href={`/beats/edit/${beat?._id}`}
                  className="font-bold p-2 hover:bg-transparent-light-blue cursor-pointer"
                >
                  Edit
                </Link>
                <div
                  className="font-bold p-2 hover:bg-transparent-light-blue cursor-pointer"
                  onClick={(e) => handleDeleteConfirm(e, beat?._id)}
                  data-confirm="0"
                >
                  Delete
                </div>
              </>
            )}
            <div
              className="font-bold p-2 hover:bg-transparent-light-blue cursor-pointer"
              onClick={handleShare}
            >
              Share
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link href={`/beats/${beat?._id}`}>
          <div className="relative w-full h-80 mb-2 rounded-md overflow-hidden">
            <Image
              src={beat?.cover || "/assets/logo.png"}
              alt="Beat cover image"
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex gap-2 justify-end mb-2 items-center">
          <span className="font-semibold">{beat?.commentsCount}</span>
          <button className="p-0 h-fit bg-transparent hover:bg-transparent">
            <Image
              src="/assets/comment.png"
              alt="Comment button"
              width={25}
              height={25}
            />
          </button>
          <span className="font-semibold">{beat?.likesCount}</span>
          <button
            className="p-0 h-fit bg-transparent hover:bg-transparent"
            onClick={() => handleLikeUnlike(beat?._id, user)}
          >
            {liked ? (
              <Image
                src="/assets/like_red.png"
                alt="Unlike button"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/assets/like.png"
                alt="Like button"
                width={25}
                height={25}
              />
            )}
          </button>
        </div>
        <div
          className="text-justify w-full h-fit truncate mb-4 cursor-pointer"
          onClick={handleDescriptionShow}
        >
          {beat?.description}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => handleBeatPlay(beat)}>Play</button>
        <div className="flex flex-col">
          <span className="font-bold">{beat?.title}</span>
          <span className="text-xs text-light-blue">
            {beat?.userId?.username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BeatCard;
