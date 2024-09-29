import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

const MobileDropdownMenuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function MobileDropdownMenu() {
  return (
    <>
      <motion.div
        variants={MobileDropdownMenuVariants}
        className="md:hidden my-2 flex flex-row"
      >
        <MobileDropdownMenuItem href="/">Home</MobileDropdownMenuItem>
        <MobileDropdownMenuItem href="/about">About</MobileDropdownMenuItem>
        <MobileDropdownMenuItem href="/blog">Blog</MobileDropdownMenuItem>
        <MobileDropdownMenuItem href="/wiki">Wiki</MobileDropdownMenuItem>
      </motion.div>
    </>
  );
}

interface MobileDropdownMenuItemProps {
  href: string;
  children: React.ReactNode;
}

const MenuItemVariants = {
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 0,
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export function MobileDropdownMenuItem(props: MobileDropdownMenuItemProps) {
  return (
    <motion.div variants={MenuItemVariants}>
      <Link to={props.href} className="px-4 py-2 text-white">
        {props.children}
      </Link>
    </motion.div>
  );
}
