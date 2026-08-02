export default function Loading(): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="max-w-container-max mx-auto flex min-h-[40vh] flex-col gap-4 px-6 py-12"
    >
      <div className="fold-panel h-8 w-1/3 rounded-full opacity-60" />
      <div className="fold-panel h-4 w-2/3 rounded-full opacity-50" />
      <div className="fold-panel h-64 w-full rounded-3xl opacity-70" />
    </div>
  );
}
