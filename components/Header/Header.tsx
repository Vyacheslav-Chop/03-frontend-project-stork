import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href="/">
        <svg width={140} height={50}>
          <use href="#"></use>
        </svg>
      </Link>
    </div>
  );
};

export default Header;
