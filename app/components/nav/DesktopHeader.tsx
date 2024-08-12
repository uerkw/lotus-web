import HamburgerMenuIcon from "./HamburgerMenuIcon";

interface NavBarStateProps {
  isOpen: boolean;
  setIsOpen: (newValue: boolean) => void;
}

export default function DesktopHeader(props: NavBarStateProps) {
  return (
    <>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Dying Lotus</div>

        <DesktopNavBar />
        <HamburgerMenuIcon isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
      </div>
    </>
  );
}

export function DesktopNavBar() {
  return (
    <div className="hidden md:flex space-x-4">
      <a href="/" className="text-white hover:text-blue-300">
        Home
      </a>
      <a href="/about" className="text-white hover:text-blue-300">
        About
      </a>
      <a href="/blog" className="text-white hover:text-blue-300">
        Blog
      </a>
      <a href="/wiki" className="text-white hover:text-blue-300">
        Wiki
      </a>
    </div>
  );
}
