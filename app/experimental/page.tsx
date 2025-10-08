import { DynamicWaitingList } from "@/components/arts";

export default async function Experimental() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center">
      <DynamicWaitingList />
    </div>
  );
}
