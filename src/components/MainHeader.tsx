import Link from "next/link";
import Nav from "./Nav";
import NewTaskButton from "@/components/Tasks/NewTaskButton";

export default function MainHeader() {
  return (
    <header className="bg-primary text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl border-r-2 border-white pr-5">
          <Link href="/" className="cursor-pointer">
            Time Tracker
          </Link>
        </h1>
        <Nav />
      </div>
      <div>
        <NewTaskButton />
      </div>
    </header>
  );
}
