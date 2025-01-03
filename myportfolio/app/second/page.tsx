'use client';

import { useState } from 'react';

export default function SecondPage() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const callApi = async () => {
    try {
      const response = await fetch('/api/respond');
      const data = await response.json();
      setApiResponse(data.message);
    } catch (error) {
      setApiResponse('Failed to call API');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Second Page</h1>
      <button
        onClick={callApi}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
      >
        Call API
      </button>
      {apiResponse && <p className="text-lg font-medium">{apiResponse}</p>}
    </div>
  );
}
