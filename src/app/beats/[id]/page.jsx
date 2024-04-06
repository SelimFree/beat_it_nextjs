import SingleBeat from "@/components/singleBeat/SingleBeat";
import { auth } from "@/lib/auth";
import { getBeat } from "@/lib/data";

export const generateMetadata = async ({ params }) => {
  const session = await auth();
  const beatId = params.id;
  const beat = await getBeat(beatId, session?.user.email);

  return {
    title: beat.title,
  };
};

async function SingleBeatPage({ params }) {
  const session = await auth();
  const beatId = params.id;
  const beat = await getBeat(beatId, session?.user.email);
  return <SingleBeat data={beat} user={session?.user}/>;
}

export default SingleBeatPage;
