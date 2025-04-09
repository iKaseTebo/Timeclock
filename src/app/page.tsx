import ClockCard from "../components/Clock/ClockCard";
import History from "../components/History";
import TaskCard from "../components/Tasks/TaskCard";

export default function Home() {
  return (
    <div >
      <div id="modal"></div>
      <main className="flex gap-10 px-20 sm:flex-col md:flex-row">
        <section className="mb-10 flex-1 flex flex-col gap-5">
          <ClockCard />
          <TaskCard />
        </section>
        <section className="flex-2">
          <History />

        </section>
      </main>
      <footer>

      </footer>
    </div>
  );
}
