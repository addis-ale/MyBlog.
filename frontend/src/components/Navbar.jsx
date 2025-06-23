import { useState } from "react";

import { DesktopLinks } from "../constants";
import Imagekit from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between h-16 md:20">
      {/* Logo */}
      <Link to={"/"} className="flex font-bold gap-4 items-center">
        <Imagekit
          w={32}
          h={32}
          alt={"logo"}
          src={"logo.png"}
          loading={"lazy"}
        />
        <span>MyBlog.</span>
      </Link>
      {/* Mobile Menu */}
      <div className="md:hidden">
        {/* Mobile Button */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "☰"}
        </div>
        {/* Mobile list link */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16  bg-[#e6e6ff]  transition-all ease-in-out ${
            isOpen ? "-right-0" : "-right-[100%]"
          }`}
        >
          {DesktopLinks.map((link) => (
            <Link to={link.link} key={link.label} href={link.link}>
              {link.label}
            </Link>
          ))}

          <SignedOut>
            <Link to="/login">
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Login ✋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex gap-8 xl:gap-12 items-center font-medium">
        {DesktopLinks.map((link) => (
          <Link to={link.link} key={link.label} href={link.link}>
            {link.label}
          </Link>
        ))}
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login ✋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
