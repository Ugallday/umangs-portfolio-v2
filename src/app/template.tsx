/**
 * Next remounts a template on every navigation, which gives each route an
 * enter animation without AnimatePresence and without shipping a motion
 * library to the client — the animation itself is CSS in globals.css, so the
 * transition costs no JavaScript. Reduced motion disables it there.
 */
export default function Template({
  children,
}: {
  readonly children: React.ReactNode;
}): React.JSX.Element {
  return <div className="page-enter">{children}</div>;
}
