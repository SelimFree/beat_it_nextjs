import { handleLogout } from "@/lib/actions";

export const metadata = {
  title: "Profile",
};

function ProfilePage() {
  return (
    <div className="px-4 pt-24 pb-16 flex flex-col gap-4 items-center justify-center h-full">
      <h2>Profile</h2>
      <form action={handleLogout}>
        <button>Logout</button>
      </form>
    </div>
  );
}

export default ProfilePage;
