import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-prose flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-display text-text-primary">This fold doesn&apos;t exist.</h1>
      <p className="text-text-secondary">The page you&apos;re looking for couldn&apos;t be found.</p>
      <Link
        href="/"
        className="rounded-md bg-accent-default px-4 py-2 text-text-on-accent hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </main>
  );
}
