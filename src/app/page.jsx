import Image from "next/image";
import Link from "next/link";

function HomePage() {
  return (
    <div className="w-full h-[90%] flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-semibold my-2">
        Welcome to Beat It
      </h2>
      <Image src="/assets/listening.png" width={250} height={250} />
      <h3 className="text-center text-xl font-regular">
        Explore others and
        <br />
        share you creativity here
      </h3>
      <div className="flex gap-4 my-4">
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold text-lg">10K+</span>
          <span>creators</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold text-lg">20K+</span>
          <span>beats</span>
        </div>
      </div>
      <Link href="/beats" className="flex justify-center items-center">
        <button>Explore</button>
      </Link>
    </div>
  );
}

export default HomePage;
