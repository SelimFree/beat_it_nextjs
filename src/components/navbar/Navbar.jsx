import Link from "next/link";
import Links from "./links/Links";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/assets/logo.png" width={50} height={50}/>
        <h1 className="text-2xl text font-bold">Beat It</h1>
      </Link>
      <div>
        <Links />
      </div>
    </nav>
  );
}

export default Navbar;
