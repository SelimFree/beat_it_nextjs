"use client";

import Image from "next/image";
import Link from "next/link";

function BeatCard({ beat }) {
  const HandleDescriptionShow = (e) => {
    e.target.classList.toggle("truncate");
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-[10px] max-w-[40rem] w-full">
      <div className="flex">
        <div className="flex mr-auto gap-4 items-center mb-4">
          <div className="relative w-12 h-12 rounded-full">
            <Image src="/assets/avatar.png" fill alt="Avatar image" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">selim.altayev@gmail.com</span>
            <span className="font-semibold text-light-blue text-xs">
              12.12.2022, 15:32
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="h-fit flex justify-center items-center p-2 bg-transparent hover:bg-transparent">
            <Image
              src="/assets/options.png"
              alt="Options button"
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
      <div>
        <div className="relative w-full h-80 mb-2 rounded-md overflow-hidden">
          <Link href="/beats/1">
            <Image
              src="/assets/testimg.png"
              alt="Beat cover image"
              fill
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex gap-2 justify-end mb-2 items-center">
          <span className="font-semibold">0</span>
          <button className="p-0 h-fit bg-transparent hover:bg-transparent">
            <Image
              src="/assets/comment.png"
              alt="Comment button"
              width={25}
              height={25}
            />
          </button>
          <span className="font-semibold">0</span>
          <button className="p-0 h-fit bg-transparent hover:bg-transparent">
            {beat?.liked ? (
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
          onClick={HandleDescriptionShow}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          atque, illum odio blanditiis excepturi expedita voluptatum tempora
          architecto, placeat a vitae aliquid nisi illo quibusdam. Veniam earum
          hic aliquam est.
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button>Play</button>
        <div className="flex flex-col">
          <span className="font-bold">Song title</span>
          <span className="text-xs text-light-blue">
            selim.altayev@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}

export default BeatCard;
