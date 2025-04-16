import { getActiveSession } from "@/lib/entries";
import { tryCatch } from "@/util/try-catch";
import ClockInButton from "./ClockInButton";
import CurrentLength from "./CurrentLength";

export default async function ClockCard() {
  const { data: activeSession, error } = await tryCatch(getActiveSession());

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="p-4 border rounded-lg shadow-md flex flex-col">
      <p className="text-2xl mb-2">
        Clocked In:{" "}
        {activeSession?.check_in
          ? new Date(activeSession.check_in).toLocaleTimeString()
          : "00:00:00"}
      </p>
      <CurrentLength activeSession={activeSession} />
      <div className="flex justify-end">
        <ClockInButton activeSession={activeSession} />
      </div>
    </div>
  );
}
