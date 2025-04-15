import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-primary text-white p-4 flex justify-around">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/tasks"
            className="cursor-pointer hover:text-purple-900 active:text-purple-300"
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            href="/history"
            className="cursor-pointer hover:text-purple-900 active:text-purple-300"
          >
            History
          </Link>
        </li>
      </ul>
    </nav>
  );
}
