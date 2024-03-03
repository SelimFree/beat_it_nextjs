import SingleBeat from "@/components/singleBeat/SingleBeat";
import { getBeat } from "@/lib/data";

async function SingleBeatPage({ params }) {
  const beatId = params.id;

  const beat = await getBeat(beatId);
  console.log(beat);
  return <SingleBeat data={beat} />;
}

export default SingleBeatPage;
