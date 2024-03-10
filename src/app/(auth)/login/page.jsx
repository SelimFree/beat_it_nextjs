import { handleCredentialsLogin, handleGoogleLogin } from "@/lib/actions";
import { auth } from "@/lib/auth";
import Link from "next/link";

async function LoginPage() {
  const session = await auth();
  console.log(session);



  return (
    <div className="px-4 pt-24 pb-16 flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mt-4 lg:mt-0">Welcome back!</h2>
      <form action={handleCredentialsLogin} className="flex flex-col gap-4 w-full lg:w-[40rem]">
        <div>
          <h4>Email</h4>
          <input
            type="text"
            name="email"
            className="w-full rounded-[5px] text-md"
          />
          <span className="text-light-red">Invalid email</span>
        </div>
        <div>
          <h4>Password</h4>
          <input
            type="password"
            name="password"
            className="w-full rounded-[5px] text-md"
          />
          <span className="text-light-red">Invalid password</span>
        </div>
        <div className="flex justify-between mb-auto lg:mb-4">
          <span>Don't have an account? </span>
          <Link
            href="register"
            className="text-dark-blue text-md font-semibold underline"
          >
            Register here
          </Link>
        </div>
        <button>Login</button>
      </form>
      <div>
        <span></span>
        <span>OR</span>
        <span></span>
      </div>
      <form
        action={handleGoogleLogin}
        className="flex flex-col gap-4 w-full lg:w-[40rem]"
      >
        <button>Continue with Google</button>
      </form>
    </div>
  );
}

export default LoginPage;
