import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/router";

function Dropdown({ children }) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

Dropdown.Trigger = function DropdownTrigger({
  children,
  unstyled,
}: {
  children: React.ReactNode;
  unstyled?: boolean;
}) {
  return (
    <>
      {unstyled ? (
        <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      ) : (
        <DropdownMenu.Trigger className="text-sm border-[0.25px] flex items-center gap-2 w-max border-white/10 hover:border-indigo-400/50 py-1 px-3 rounded-full cursor-pointer transition-all">
          {children}
        </DropdownMenu.Trigger>
      )}
    </>
  );
};

Dropdown.Portal = function DropdownPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DropdownMenu.Portal>{children}</DropdownMenu.Portal>;
};

Dropdown.Content = function DropdownContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu.Content
      loop
      className="m-1 border-[0.5px] border-white/10 bg-primary-900/30 backdrop-blur-lg rounded-md text-xs w-40 p-1 animate-scalein"
    >
      {children}
    </DropdownMenu.Content>
  );
};

interface IItemProps {
  text: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

Dropdown.Item = function DropdownItem({
  onClick,
  text,
  href,
  icon,
}: IItemProps) {
  return (
    <>
      {href ? (
        <Link href={href!}>
          <DropdownMenu.Item
            className="focus:border-indigo-300 flex items-center justify-start bg-transparent border-[1px] border-transparent hover:border-indigo-300/30 rounded-md hover:bg-gradient-to-l hover:from-indigo-700/20 hover:to-fuchsia-600/20 hover:text-white outline-none p-1 transition-all cursor-pointer"
            role="link"
            onClick={onClick}
          >
            <div className="grid grid-cols-6  w-full leading-4 divide-x divide-solid divide-white/10">
              <span className="col-span-1">{icon}</span>
              <span className="col-span-4 pl-2">{text}</span>
            </div>
          </DropdownMenu.Item>
        </Link>
      ) : (
        <DropdownMenu.Item
          className="focus:border-indigo-300 flex items-center justify-start bg-transparent border-[1px] border-transparent hover:border-indigo-300/30 rounded-md hover:bg-gradient-to-l hover:from-indigo-700/20 hover:to-fuchsia-600/20 hover:text-white outline-none p-1 transition-all cursor-pointer"
          role="link"
          onClick={onClick}
        >
          <div className="grid grid-cols-6  w-full leading-4 divide-x divide-solid divide-white/10">
            <span className="col-span-1">{icon}</span>
            <span className="col-span-4 pl-2">{text}</span>
          </div>
        </DropdownMenu.Item>
      )}
    </>
  );
};

export default Dropdown;
