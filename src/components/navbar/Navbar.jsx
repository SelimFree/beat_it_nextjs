import Link from "next/link";
import Links from "./links/Links";
import Image from "next/image";
import { auth } from "@/lib/auth";

async function Navbar() {
  const session = await auth();

  const links = [
    {
      title: "Beats",
      path: "/beats",
      visible: true,
    },
    {
      title: "Admin",
      path: "/admin",
      visible: session?.user?.isAdmin,
    },
    {
      title: "Profile",
      path: "/profile",
      visible: session?.user,
    },
    {
      title: "My beats",
      path: "/beats/my",
      visible: session?.user,
    },
    {
      title: "Create beat",
      path: "/beats/new",
      visible: session?.user,
    },
    {
      title: "Login",
      path: "/login",
      visible: !session?.user,
    },
    {
      title: "About",
      path: "/about",
      visible: true,
    },
    {
      title: "Contact us",
      path: "/contact",
      visible: true,
    },
  ];

  return (
    <nav className="w-full flex justify-between items-center py-2 px-4 fixed top-0 right-0 bg-transparent-light-blue z-10">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/assets/logo.png" width={50} height={50} alt="Logo" />
        <h1 className="text-2xl text font-bold">Beat It</h1>
      </Link>
      <div>
        <Links links={links} user={session?.user} />
      </div>
    </nav>
  );
}

export default Navbar;
