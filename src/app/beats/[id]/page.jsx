import SingleBeat from "@/components/singleBeat/SingleBeat";
import { auth } from "@/lib/auth";
import { getBeat, getComments } from "@/lib/data";

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
  const comments = await getComments({ page: 1, beatId });
  return <SingleBeat data={{ beat, comments }} user={session?.user} />;
}

export default SingleBeatPage;
