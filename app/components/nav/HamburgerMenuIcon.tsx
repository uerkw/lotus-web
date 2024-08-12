interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: (newValue: boolean) => void;
}

export default function HamburgerMenuIcon(props: HamburgerProps) {
  return (
    <div className="md:hidden">
      <button
        onClick={() => {
          props.setIsOpen(!props.isOpen);
        }}
        aria-label="Mobile Dropdown Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={props.isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>
    </div>
  );
}
