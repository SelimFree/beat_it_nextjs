"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    title: "Beats",
    path: "/beats",
  },
  {
    title: "Admin",
    path: "/admin",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "My beats",
    path: "/beats/my",
  },
  {
    title: "Create beat",
    path: "/beats/create",
  },
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact us",
    path: "/contact",
  },
];

function Links() {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div>
      <button onClick={() => setMenuOpened(true)}>
        <Image src="/assets/menu.png" width={25} height={25}/>
      </button>
      <div
        className={`fixed top-0 right-0 transition-transform duration-300 ease-out ${
          menuOpened ? "translate-x-0" : "translate-x-[100%]"
        } w-full h-full bg-transparent z-10 flex justify-end`}
        onClick={() => setMenuOpened(false)}
      >
        <div className="w-[75%] h-full relative bg-dark-blue flex flex-col gap-4 justify-center items-center font-semibold">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-white text-lg"
            >
              {link.title}
            </Link>
          ))}
          <div className="text-white absolute bottom-5 right-5 text-lg">Beat It Rocks!</div>
        </div>
      </div>
    </div>
  );
}

export default Links;
