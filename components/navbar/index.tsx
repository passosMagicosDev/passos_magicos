import Link from "next/link";
import React from "react";
import User from "@/public/imgs/icons/user.svg";

import Image from "next/image";
import { itemsNavBar } from "@/utils/navbarItems";
import SignOut from "../signOut";

function Navbar() {
  return (
    <nav className="max-w-[400px] relative">
      <p className="bg-[#00459E] flex gap-2 text-xl text-white py-5 px-10">
        <Image alt="" src={User} /> Olá, Fulano
      </p>
      <ul className="p-10 flex flex-col gap-5  border-r border-[#C3C3C3] h-[calc(100%-68px)]">
        {itemsNavBar.map((el) => (
          <li key={el.item}>
            <Link href={el.url} className="flex gap-5">
              <Image src={el.img} alt="" />
              <span
                className={`text-xl ${
                  el.active ? "text-[#2377C6]" : "text-[#333333]"
                }`}
              >
                {el.item}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <SignOut />
    </nav>
  );
}

export default Navbar;
