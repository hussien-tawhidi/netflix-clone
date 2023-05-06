import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobielMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}>
        <Image
          src='/images/logo.png'
          width={100}
          height={100}
          className='h-4 lg:h-7'
          alt='logo'
        />
        <div className='md:flex flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New and popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by language' />
        </div>
        <div
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
          onClick={toggleMobileMenu}>
          <p className='text-white text-sm'>Browse</p>
          <MdOutlineKeyboardArrowDown
            className={`text-white transition duration-400 ${
              showMobielMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobielMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300  cursor-pointer transition duration-200'>
            <AiOutlineSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300  cursor-pointer transition duration-200'>
            <AiOutlineBell />
          </div>
          <div
            className='flex flex-row items-center gap-2 cursor-pointer relative'
            onClick={toggleAccountMenu}>
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image
                src='/images/default-blue.png'
                className='w-full h-full'
                alt='user avatar'
                width={100}
                height={100}
              />
            </div>
            <MdOutlineKeyboardArrowDown
              className={`text-white transition duration-150 ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
