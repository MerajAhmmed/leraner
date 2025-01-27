"use client";

import { useParams } from "next/navigation";

export default function NotFoundPage() {
  const params = useParams();
  return (
    <div className="h-screen flex justify-center items-center w-full bg-gray-100">
      <p className="text-xl text-gray-800">This URL was not found!</p>
    </div>
  );
}
