import { motion, useCycle } from "framer-motion";
import { ToggleHamburger } from "./ToggleHamburger";
import { Link } from "@remix-run/react";

interface NavBarStateProps {
  isOpen: boolean;
  setIsOpen: (newValue: boolean) => void;
}

export default function DesktopHeader(props: NavBarStateProps) {
  const [isOpen, setIsOpen] = useCycle(false, true);

  const toggleOpen = () => {
    setIsOpen();
    props.setIsOpen(!props.isOpen);
  };

  return (
    <>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Dying Lotus</div>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom="100%"
        >
          <DesktopNavBar />
          <ToggleHamburger toggle={toggleOpen} />
        </motion.nav>
      </div>
    </>
  );
}

export function DesktopNavBar() {
  return (
    <div className="hidden md:flex space-x-4">
      <Link to="/" className="text-white hover:text-blue-300">
        Home
      </Link>
      <Link to="/about" className="text-white hover:text-blue-300">
        About
      </Link>
      <Link to="/blog" className="text-white hover:text-blue-300">
        Blog
      </Link>
      <Link to="/wiki" className="text-white hover:text-blue-300">
        Wiki
      </Link>
    </div>
  );
}
