'use client';

import { useRouter } from 'next/navigation';
import Card from "@/components/ui/card";

export default function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card/>
    </div>
  );
}
