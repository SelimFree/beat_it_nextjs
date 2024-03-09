import SingleBeat from "@/components/singleBeat/SingleBeat";
import { getBeat } from "@/lib/data";

export const generateMetadata = async ({ params }) => {
  const beatId = params.id;
  const beat = await getBeat(beatId);

  return {
    title: beat.title,
  };
};

async function SingleBeatPage({ params }) {
  const beatId = params.id;

  const beat = await getBeat(beatId);
  return <SingleBeat data={beat} />;
}

export default SingleBeatPage;
