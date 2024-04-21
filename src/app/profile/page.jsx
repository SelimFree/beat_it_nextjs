import ProfileForm from "@/components/profileForm/profileForm";
import { auth } from "@/lib/auth";
import { getUserInfo } from "@/lib/data";
export const metadata = {
  title: "Profile",
};

async function ProfilePage() {
  const session = await auth();
  const userInfo = await getUserInfo(session?.user);
  return (
    <div className="h-full px-4 py-16 flex flex-col gap-4 items-center justify-center">
      <ProfileForm userInfo={userInfo}/>
    </div>
  );
}

export default ProfilePage;
