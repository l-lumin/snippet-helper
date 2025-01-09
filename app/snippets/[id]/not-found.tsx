import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Could not find the requested snippet</p>
      <p>
        <Link href="/snippets">Go home</Link>
      </p>
    </div>
  );
}