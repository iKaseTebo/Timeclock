import ClockCard from "../components/ClockCard";
import History from "../components/History";

export default function Home() {
  return (
    <div >
      <div id="modal"></div>
      <main className="flex gap-10 px-20 sm:flex-col md:flex-row">
        <section className="mb-10 flex-1">
          <ClockCard />
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
