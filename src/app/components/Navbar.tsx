import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="เมนูหลัก">
      <ul className="navList">

        <li>
          <Link className="navLink" href="/">
            หน้าแรก
          </Link>
        </li>

        <li>
          <Link className="navLink" href="/courses">
            รายวิชา
          </Link>
        </li>

        {/* เมนูวงดนตรี */}
        <li>
          <Link className="navLink" href="/bands">
            วงดนตรี
          </Link>
        </li>

        {/* เมนู Games */}
        <li>
          <Link className="navLink" href="/games">
            Games
          </Link>
        </li>

        <li>
          <Link className="navLink" href="/about">
            เกี่ยวกับ
          </Link>
        </li>

      </ul>
    </nav>
  );
}