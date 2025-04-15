import ClockCard from "../components/Clock/ClockCard";
import History from "../components/History";
// import TaskCard from "../components/Tasks/TaskCard";

export default function Home() {
  return (
    <div>
      <main className="grid md:grid-cols-12 gap-10 px-20">
        <section className="mb-10 mt-12 md:col-span-3">
          <ClockCard />
        </section>
        <section className="md:col-span-9">
          <History />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
