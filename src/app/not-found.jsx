import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="w-full h-[90%] lg:h-[80%] flex flex-col gap-4 justify-center items-center">
      <h2 className="text-4xl font-bold ">404 Not Found</h2>
      <p>Oops! It seems the page is not found</p>
      <Link href="/">
        <button>Go home</button>
      </Link>
    </div>
  );
}

export default NotFound;
