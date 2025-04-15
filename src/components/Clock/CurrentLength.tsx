"use client";
import { useEffect, useState } from "react";
import { timeDifferenceFromNow } from "../../util/formatting";
import { Entry } from "@/types/entries";

export default function CurrentLength({
  activeSession,
}: {
  activeSession: Entry | null;
}) {
  const [currentLength, setCurrentLength] = useState(
    activeSession?.check_in
      ? timeDifferenceFromNow(activeSession.check_in)
      : "00h 00m 00s"
  );

  useEffect(() => {
    if (!activeSession?.check_in) return;

    const interval = setInterval(() => {
      setCurrentLength(timeDifferenceFromNow(activeSession.check_in));
    }, 1000);

    return () => {
      clearInterval(interval);
      setCurrentLength("00h 00m 00s");
    };
  }, [activeSession?.check_in]);

  return (
    <p className="text-2xl mb-2">Current Session Length: {currentLength}</p>
  );
}
