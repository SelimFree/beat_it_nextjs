"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Links({ links, user }) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuOpenedMobile, setMenuOpenedMoblie] = useState(false);

  useEffect(() => {
    const handleMenuClose = (e) => {
      const target = e.target;

      if (!target.closest("#desktop-links")) {
        setMenuOpened(false);
      }
    };
    window.addEventListener("click", handleMenuClose);

    return () => {
      window.removeEventListener("click", handleMenuClose);
    };
  }, []);

  return (
    <>
      <div className="lg:hidden">
        <button onClick={() => setMenuOpenedMoblie(true)}>
          <Image
            src="/assets/menu.png"
            width={25}
            height={25}
            alt="Menu icon"
          />
        </button>
        <div
          className={`fixed top-0 right-0 transition-transform duration-300 ease-out ${
            menuOpenedMobile ? "translate-x-0" : "translate-x-[100%]"
          } w-full h-full bg-transparent z-10 flex justify-end`}
          onClick={() => setMenuOpenedMoblie(false)}
        >
          <div className="w-[75%] h-full relative bg-dark-blue flex flex-col gap-4 justify-center items-center font-semibold">
            {links.map((link) => {
              if (link.visible) {
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="text-white text-lg"
                  >
                    {link.title}
                  </Link>
                );
              }
            })}
            <div className="text-white absolute bottom-5 right-5 text-lg">
              Beat It Rocks!
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative" id="desktop-links">
        <button
          className="flex gap-4 items-center"
          onClick={() => setMenuOpened(!menuOpened)}
        >
          <span className="text-md">{user ? user.name : "Guest"}</span>
          <Image
            src="/assets/menu.png"
            width={25}
            height={25}
            alt="Menu icon"
          />
        </button>
        <nav
          className={`w-[150%] absolute flex flex-col right-0 top-[110%] overflow-hidden bg-light-blue rounded-[10px] ${
            menuOpened ? "" : "scale-0"
          } transition-transform duration-150 ease-out`}
          onClick={() => setMenuOpened(false)}
        >
          {links.map((link) => {
            if (link.visible) {
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-white text-lg p-2 hover:bg-dark-blue"
                >
                  {link.title}
                </Link>
              );
            }
          })}
        </nav>
      </div>
    </>
  );
}

export default Links;
