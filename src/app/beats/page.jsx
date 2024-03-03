import BeatList from "@/components/beatList/BeatList";
import { getBeats } from "@/lib/data";

async function BeatsPage() {
  const beats = await getBeats();
  return <BeatList data={beats} />;
}

export default BeatsPage;
