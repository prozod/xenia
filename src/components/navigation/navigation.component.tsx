import {
  Component2Icon,
  GearIcon,
  HamburgerMenuIcon,
  LockClosedIcon,
  LockOpen2Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useOutside from "../../hooks/useOutside";
import Button from "../button/button.component";
import Dropdown from "../dropdown/dropdown.component";

function Navigation() {
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const { isComponentVisible, setIsComponentVisible } = useOutside(menuRef);
  const { data: session } = useSession();

  useEffect(() => {
    window.innerWidth <= Number(768) && setIsMobile(true);
    window.addEventListener("resize", () => {
      if (window.innerWidth <= Number(768)) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsComponentVisible(false);
      }
    });
  }, [setIsComponentVisible]);

  return (
    <nav className="relative flex justify-center mx-auto z-40 w-full">
      <div className="box my-6 mx-6 md:mx-0 flex column justify-between">
        <Navigation.LogoContainer />
        <Navigation.ListWrapper
          isOpen={isComponentVisible}
          isMobile={isMobile}
          ref={menuRef}
        >
          <Navigation.ListItem
            href="/"
            text="Home"
            onClick={() => setIsComponentVisible(false)}
          />
          <Navigation.ListItem
            href="/albums"
            text="Albums"
            onClick={() => setIsComponentVisible(false)}
          />
          <Navigation.ListItem
            href="/about"
            text="About"
            onClick={() => setIsComponentVisible(false)}
          />
          <Navigation.ListItem
            href="/faq"
            text="Frequently Asked Questions"
            onClick={() => setIsComponentVisible(false)}
          />
          {!session && isMobile && (
            <Navigation.CTAItem
              href="/auth/signin"
              text="Log in"
              icon={<PersonIcon width={20} height={20} />}
              onClick={() => setIsComponentVisible(false)}
            />
          )}
          {session && isMobile && (
            <>
              <div className="py-4 text-indigo-300 border-t-[1px] border-white/10">
                <span>Logged in as {session.user?.email}</span>
              </div>
              <Navigation.CTAItem
                icon={<LockOpen2Icon width={14} height={14} />}
                text="Sign out"
                onClick={() => signOut()}
              />
            </>
          )}
        </Navigation.ListWrapper>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: "0deg", opacity: 1, scale: 1 }}
          initial={{ rotate: "-90deg", opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          role="button"
          className="z-50 absolute right-6 top-5 md:hidden"
        >
          <HamburgerMenuIcon
            data-button
            width={40}
            height={40}
            className={`${
              isComponentVisible ? "rotate-90" : "rotate-0"
            }  hover:bg-zinc-700/50 p-2 rounded-md transition-all cursor-pointer`}
            onClick={() => {
              setIsComponentVisible(!isComponentVisible);
            }}
          />
        </motion.button>
        {!isMobile && (
          <Navigation.CTAWrapper>
            <Dropdown>
              {session ? (
                <Dropdown.Trigger unstyled>
                  <div className="flex items-center justify-center m-0 p-0 space-x-2 text-sm font-medium hover:text-indigo-400 transition-all group">
                    <span className=" flex rounded-full border-2 border-indigo-500 rounded-full group-hover:border-indigo-500/70 group-hover:animate-pulse transition-all">
                      <Image
                        layout="intrinsic"
                        width={30}
                        height={30}
                        alt={session?.user?.email as string}
                        src={session.user?.image as string}
                        className="rounded-full"
                      />
                    </span>
                    <span>{session.user?.name}</span>
                  </div>
                </Dropdown.Trigger>
              ) : (
                <Dropdown.Trigger>
                  <PersonIcon width={18} height={18} /> Account
                </Dropdown.Trigger>
              )}
              <Dropdown.Portal>
                <Dropdown.Content>
                  {!session && (
                    <Dropdown.Item
                      icon={<LockClosedIcon width={14} height={14} />}
                      text="Log In"
                      href="/auth/signin"
                    />
                  )}
                  {session && (
                    <>
                      <Dropdown.Item
                        icon={<Component2Icon width={14} height={14} />}
                        text="Profile"
                        href={`/user/${session?.user.id}`}
                      />
                      <Dropdown.Item
                        icon={<GearIcon width={14} height={14} />}
                        text="Settings"
                        href="/account/edit"
                      />
                      <Dropdown.Item
                        icon={<LockOpen2Icon width={14} height={14} />}
                        text="Sign out"
                        onClick={() => signOut()}
                      />
                    </>
                  )}
                </Dropdown.Content>
              </Dropdown.Portal>
            </Dropdown>
          </Navigation.CTAWrapper>
        )}
      </div>
    </nav>
  );
}

const BasicSlideDownAnimation = {
  animate: { y: "0%", opacity: 1 },
  initial: { y: "-100%", opacity: 0 },
  exit: { y: "-100%", opacity: 0 },
};

Navigation.LogoContainer = function LogoContainer() {
  const router = useRouter();
  return (
    <motion.div
      className="flex items-center font-semibold text-md tracking-wide gap-2 cursor-pointer"
      variants={BasicSlideDownAnimation}
      animate="animate"
      initial="initial"
      exit="exit"
      transition={{ duration: 0.25 }}
      onClick={() => router.push("/")}
    >
      <Image
        src="/icon.svg"
        layout="intrinsic"
        width={32}
        height={32}
        alt="xenia"
      />
      <p>Xenia</p>
    </motion.div>
  );
};

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  isOpen: boolean;
  isMobile: boolean;
}

Navigation.ListWrapper = React.forwardRef<HTMLUListElement, Props>(
  function ListWrapper(props, ref) {
    let MenuAnimation = {};
    const { children, isOpen, isMobile } = props;

    if (isMobile) {
      MenuAnimation = {
        animate: { x: "0%", opacity: 1 },
        initial: { x: "-100%", opacity: 0 },
        exit: { x: "-100%", opacity: 0 },
        transition: { duration: 0.25, bounce: 0, type: "tween" },
      };
    } else {
      MenuAnimation = {
        animate: { y: "0%", opacity: 1 },
        initial: { y: "-100%", opacity: 0 },
        exit: { y: "-100%", opacity: 0 },
        transition: { duration: 0.25 },
      };
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="mobile-menu"
            ref={ref}
            variants={MenuAnimation}
            animate="animate"
            initial="initial"
            exit="exit"
            className={`flex flex-col fixed space-y-2 justify-start text-md w-screen bg-gradient-to-l from-primary-800/50 to-primary-900/50 backdrop-blur-xl py-16 items-center left-0 top-0 flex-shrink-0 border-b-[0.5px] border-white/10 drop-shadow-xl`}
          >
            {children}
          </motion.ul>
        )}

        {!isMobile && (
          <motion.ul
            key="desktop-menu"
            variants={MenuAnimation}
            animate="animate"
            initial="initial"
            exit="exit"
            className={`hidden md:flex grow-0 justify-start text-sm items-center bg-transparent py-0 w-max space-x-1 lg:space-x-4 flex-shrink-0`}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    );
  }
);

Navigation.ListItem = function ListItem({
  text,
  href,
  icon,
  onClick,
}: {
  text: string;
  icon?: React.ReactNode;
  href: string;
  onClick?: () => void;
}) {
  return (
    <li
      className={`block py-1 px-3 bg-transparent block border-l-[1px] border-r-[1px] border-transparent leading-2 hover:border-fuchsia-400/50 hover:text-white/80 hover:shadow-lg hover:shadow-fuchsia-400/10 rounded-full transition-all cursor-pointer  ${
        icon && "flex gap-2 items-center"
      }`}
      onClick={onClick}
    >
      {icon}
      <Link href={href}>{text}</Link>
    </li>
  );
};

Navigation.CTAWrapper = function CTAWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`hidden md:flex flex-col absolute space-y-2 justify-start text-md md:text-sm w-screen bg-primary-800 py-16 items-center left-0 top-0 md:bg-transparent md:flex-row md:relative md:py-0 md:w-max md:space-y-0 md:space-x-4  flex-shrink-0`}
      variants={BasicSlideDownAnimation}
      animate="animate"
      initial="initial"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

Navigation.CTAItem = function CTAItem({
  text,
  href,
  icon,
  onClick,
}: {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <span onClick={onClick}>
      <Button.Outline
        type="button"
        text={text}
        href={href}
        iconLeft={icon}
        expand
      />
    </span>
  );
};

export default Navigation;
