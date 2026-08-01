export default function Loading(): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="mx-auto flex min-h-[40vh] max-w-container-max animate-pulse flex-col gap-4 px-6 py-12"
    >
      <div className="h-8 w-1/3 rounded-md bg-surface-overlay" />
      <div className="h-4 w-2/3 rounded-md bg-surface-overlay" />
      <div className="h-64 w-full rounded-lg bg-surface-overlay" />
    </div>
  );
}
