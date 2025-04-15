import { getActiveSession } from "@/lib/entries";
import ClockInButton from "./ClockInButton";
import CurrentLength from "./CurrentLength";

export default async function ClockCard() {
  const activeSession = await getActiveSession();

  return (
    <div className="p-4 border rounded-lg shadow-md flex:sm flex-col">
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
