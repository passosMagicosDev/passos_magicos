import Calendar from "@/components/calendar";
import { headers } from "next/headers";
import { Suspense } from "react";
import LoadingCalendar from "./loading";

function App() {
  return (
    <Suspense fallback={<LoadingCalendar />}>
      <Calendar />
    </Suspense>
  );
}

export default App;
