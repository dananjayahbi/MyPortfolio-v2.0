'use client';

import { useRouter } from 'next/navigation';
import InfoCard from "@/components/infoCard";

export default function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <InfoCard/>
    </div>
  );
}
