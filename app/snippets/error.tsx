"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`Error digest: ${error.digest}`);
  }, [error]);

  return (
    <div>
      <h1>Error</h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
