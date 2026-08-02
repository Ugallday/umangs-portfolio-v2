import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-prose flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="fold-panel rounded-[2rem] p-8 sm:p-10">
        <p className="text-text-muted text-xs tracking-[0.3em] uppercase">Not found</p>
        <h1 className="text-text-primary mt-4 text-3xl font-semibold tracking-tight">
          This fold doesn&apos;t exist.
        </h1>
        <p className="text-text-secondary mt-4">
          The page you&apos;re looking for couldn&apos;t be found.
        </p>
      </div>
      <Link
        href="/"
        className="bg-accent-default text-text-on-accent hover:bg-accent-hover inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition"
      >
        Back to home
      </Link>
    </main>
  );
}
