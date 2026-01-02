'use client'
import Link from "next/link"
import UserButton from '@/components/user-button';

export default function Navbar() {
  return (
    <nav className="bg-black p-4 px-16 flex items-center justify-between">
      <ul className="flex space-x-8 text-xl font-bold text-white">
        <li>
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/help" className="hover:text-gray-300 transition">
            Help
          </Link>
        </li>
      </ul>
      <UserButton />
    </nav>
  );
}
