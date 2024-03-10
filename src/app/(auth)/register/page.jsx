import { handleCredentialsRegister } from "@/lib/actions";
import Link from "next/link";

function RegisterPage() {
  return (
    <div className="px-4 pt-24 pb-16 flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mt-4 lg:mt-0">
        Welcome to Beat It!
      </h2>
      <form
        action={handleCredentialsRegister}
        className="flex flex-col gap-4 w-full lg:w-[40rem]"
      >
        <div>
          <h4>Username</h4>
          <input
            type="text"
            name="username"
            className="w-full rounded-[5px] text-md"
          />
          <span className="text-light-red">Invalid username</span>
        </div>
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
        <div>
          <h4>Repeat password</h4>
          <input
            type="text"
            name="repeat_password"
            className="w-full rounded-[5px] text-md"
          />
          <span className="text-light-red">Password doenst match</span>
        </div>
        <div className="flex justify-between mb-auto lg:mb-4">
          <span>Have an account? </span>
          <Link
            href="login"
            className="text-dark-blue text-md font-semibold underline"
          >
            {" "}
            Login here
          </Link>
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
