import BeatCard from "@/components/beatCard/BeatCard";

const BeatsPage = () => {
  return (
    <div className="px-4 pb-16 pt-4 flex flex-col gap-4 items-center">
      {[1, 2, 3].map((el, i) => (
        <BeatCard key={i} beat={el} />
      ))}
    </div>
  );
};

export default BeatsPage;
