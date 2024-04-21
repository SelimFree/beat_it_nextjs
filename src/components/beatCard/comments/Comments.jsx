"use client";

import { formatDate } from "@/components/utils";
import { handleCommentCreate, handleLoadMoreComments } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";

function Comments({ comments, user, beatId }) {
  const [page, setPage] = useState(2);
  const [formState, formAction] = useFormState(handleCommentCreate, undefined);

  const [commentsState, commentsAction] = useFormState(
    handleLoadMoreComments,
    comments
  );

  const loadMore = (formData) => {
    commentsAction(formData);
    setPage((prev) => {
      return prev + 1;
    });
  };

  const send = (formData) => {
    formAction(formData);
    window.location.reload();
  };

  const handleContentShow = (e) => {
    e.target.classList.toggle("truncate");
  };

  return (
    <div className="w-full max-w-[40rem] flex flex-col items-start">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      <div className="flex w-full mb-4">
        <form action={send} className="w-full flex flex-col">
          <div className="w-full flex">
            <input
              type="text"
              name="comment_content"
              className="flex-1 rounded-l-[10px] text-md border-2 border-light-blue"
              disabled={user ? false : true}
            />
            <input type="hidden" value={user} name="userEmail" />
            <input type="hidden" value={beatId} name="beatId" />
            <button
              className="w-[5rem] rounded-r-[10px] rounded-l-none"
              disabled={user ? false : true}
            >
              Send
            </button>
          </div>
          <span
            className={`text-light-red${formState?.error ? "" : " hidden"}`}
          >
            {formState?.error}
          </span>
        </form>
      </div>
      <div className="w-full flex flex-col rounded-[10px] p-4 bg-white">
        {commentsState?.map((comment, i) => (
          <div
            key={i}
            className={`py-4 ${
              i === 0 ? "" : "border-t-2 border-transparent-dark-blue"
            }`}
          >
            <div className="flex mr-auto gap-4 items-center mb-4">
              <div className="relative w-12 h-12 rounded-full">
                <Image
                  src={`${
                    comment?.userId?.picture
                      ? comment?.userId.picture
                      : "/assets/avatar.png"
                  }`}
                  fill
                  alt="Avatar image"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{comment?.userId?.username}</span>
                <span className="font-semibold text-light-blue text-xs">
                  {formatDate(comment?.createdAt)}
                </span>
              </div>
            </div>
            <div
              className="text-justify pl-4 w-full h-fit truncate cursor-pointer"
              onClick={handleContentShow}
            >
              {comment?.content}
            </div>
          </div>
        ))}
        {commentsState?.length ? (
          <form action={loadMore} className="self-center">
            <input type="hidden" name="page" value={page} />
            <input type="hidden" value={beatId} name="beatId" />
            <button>More</button>
          </form>
        ) : (
          <div className="w-full flex items-center justify-center">
            <h3 className="font-bold text-lg">No comments to show =(</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
