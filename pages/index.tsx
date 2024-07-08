import Button from "@/components/button";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">
          Simple Weather App
        </h1>
        <div className="w-[60%] grid grid-cols-1 md:grid-cols-2 gap-24">
          <Button title="Now" onClick={() => router.push("/now")} />
          <Button title="Forecast" onClick={() => router.push("/forecast")} />
        </div>
      </div>
    </div>
  );
}
