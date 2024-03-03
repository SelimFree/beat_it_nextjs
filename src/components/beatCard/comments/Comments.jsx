"use client";
import Image from "next/image";

function Comments() {
  return (
    <div className="w-full max-w-[40rem] flex flex-col items-start">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      <div className="flex w-full mb-4">
        <input
          type="text"
          className="flex-1 rounded-l-[10px] p-2 text-md focus:outline-light-blue"
        />
        <button className="rounded-r-[10px] rounded-l-none">Send</button>
      </div>
      <div className="w-full flex flex-col rounded-[10px] p-2 bg-white">
        {[1, 2, 3].map((el, i) => (
          <div
            key={i}
            className={`py-4 ${
              i === 0 ? "" : "border-t-2 border-transparent-dark-blue"
            }`}
          >
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
            <div className="text-justify pl-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
              doloremque aperiam totam corrupti esse expedita, beatae
              consectetur quasi, optio odio laudantium dolore consequuntur ab
              saepe? Aliquid dignissimos nulla deserunt in.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
