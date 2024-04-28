import BeatList from "@/components/beatList/BeatList";
import { getBeats } from "@/lib/data";
import { auth } from "@/lib/auth";
export const metadata = {
  title: "My Beats",
};

async function MyBeatsPage() {
  const session = await auth();
  const beats = await getBeats({ page: 1, user: session?.user.email, my: true });
  return <BeatList data={beats} user={session?.user} />;
}

export default MyBeatsPage;
