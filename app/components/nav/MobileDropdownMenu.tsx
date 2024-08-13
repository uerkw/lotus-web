interface MenuProps {
  isOpen: boolean;
}

export default function MobileDropdownMenu(props: MenuProps) {
  return (
    <>
      {props.isOpen && (
        <div className="md:hidden my-2">
          <a
            href="/"
            className=" px-4 py-2 text-white rounded-md hover:bg-blue-400"
          >
            Home
          </a>
          <a
            href="/about"
            className="px-4 py-2 text-white rounded-md hover:bg-blue-500"
          >
            About
          </a>
          <a
            href="/blog"
            className="px-4 py-2 text-white rounded-md hover:bg-blue-500"
          >
            Blog
          </a>
          <a
            href="/wiki"
            className="px-4 py-2 text-white rounded-md hover:bg-blue-500"
          >
            Wiki
          </a>
        </div>
      )}
    </>
  );
}
