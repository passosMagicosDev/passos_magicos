"use client";

import { signOut } from "next-auth/react";
import React from "react";
import Sair from "@/public/imgs/icons/sair.svg";
import Image from "next/image";

function SignOut() {
  function handleSignOut() {
    sessionStorage.clear();
    signOut();
  }
  return (
    <button
      className="p-10 flex gap-5 absolute bottom-0"
      onClick={handleSignOut}
    >
      <Image src={Sair} alt="" /> Sair
    </button>
  );
}

export default SignOut;
