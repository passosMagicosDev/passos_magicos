"use client";

import { signOut } from "next-auth/react";
import React from "react";
import Sair from "@/public/imgs/icons/sair.svg";
import Image from "next/image";

function SignOutMobile() {
  function handleSignOut() {
    sessionStorage.clear();
    signOut();
  }
  return (
    <button className="flex gap-2" onClick={handleSignOut}>
      <Image src={Sair} alt="" /> Sair
    </button>
  );
}

export default SignOutMobile;
