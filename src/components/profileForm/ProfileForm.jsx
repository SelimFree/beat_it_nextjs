"use client";

import { handleLogout, handleUpdateUserAvatar } from "@/lib/actions";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

function ProfileForm({ userInfo }) {
  const [localAvatar, setLocalAvatar] = useState(userInfo?.picture);
  const [changing, setChanging] = useState(false);
  const avatarInput = useRef();

  const [formState, formAction] = useFormState(
    handleUpdateUserAvatar,
    undefined
  );

  const handleAvatarChange = () => {
    const selectedFile = avatarInput.current.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setLocalAvatar(() => {
          return e.target.result;
        });
      };
      reader.readAsDataURL(selectedFile);
    }
    setChanging(() => {
      return true;
    });
  };

  const handleChangeBtnClick = (formData) => {
    if (changing) {
      formAction(formData);
      setChanging(() => {
        return false;
      });
    } else {
      avatarInput.current.click();
    }
  };

  return (
    <div className="max-w-[55rem] w-[80%] relative rounded-md shadow-lg bg-white">
      <div className="w-[100px] h-[100px] rounded-full absolute shadow-md top-[-4rem] left-[calc(50%-50px)]">
        <Image
          src={`${localAvatar ? localAvatar : "/assets/avatar.png"}`}
          fill
          alt="Logo"
          className="rounded-full object-cover"
        />
      </div>
      <div className="h-full p-4 flex flex-col items-center justify-between pt-[4rem] md:pt-[6rem]">
        <div className="">
          <h2 className="text-dark-blue text-[2rem] text-center font-semibold">
            {userInfo?.name}
          </h2>
          <h4 className="text-light-blue text-[1rem] text-center font-semibold">
            {userInfo?.email}
          </h4>
        </div>
        <div className="flex md:flex-row flex-col gap-8 items-center justify-center">
          <div className="w-full md:w-auto flex gap-2 items-center font-semibold justify-start md:justify-normal">
            <Image src="/assets/post.png" width={25} height={25} alt="Posts" />
            <span>{userInfo?.beatsCount} Beats</span>
          </div>
          <div className="w-full md:w-auto flex gap-2 items-center font-semibold justify-start md:justify-normal">
            <Image
              src="/assets/comment.png"
              width={25}
              height={25}
              alt="Comment"
            />
            <span>{userInfo?.commentsCount} Comments</span>
          </div>
          <div className="w-full md:w-auto flex gap-2 items-center font-semibold justify-start md:justify-normal">
            <Image src="/assets/like.png" width={25} height={25} alt="Like" />
            <span>{userInfo?.likesCount} Likes</span>
          </div>
        </div>
        <form action={handleChangeBtnClick}>
          <input
            ref={avatarInput}
            className="hidden"
            name="avatar_update"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleAvatarChange}
          />
          <input type="hidden" name="user" value={userInfo?.email} />
          <button>{changing ? "Save" : "Change Picture"}</button>
        </form>
        <span className={`text-light-red${formState?.error ? "" : " hidden"}`}>
          {formState?.error}
        </span>
      </div>
      <form
        action={handleLogout}
        className="flex items-center justify-center my-4"
      >
        <button>Logout</button>
      </form>
    </div>
  );
}

export default ProfileForm;
