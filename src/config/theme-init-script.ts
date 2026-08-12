/**
 * The pre-hydration theme script, and the CSP hash that authorises it.
 *
 * Why this lives in its own module rather than inline in layout.tsx:
 *
 * The script used to be rendered with `nonce={nonce}` from the per-request
 * middleware nonce. That produced a hydration mismatch on every single page
 * load. The HTML spec requires a browser to clear the `nonce` *content*
 * attribute to the empty string once the element is inserted, so that a
 * stylesheet cannot read the value back out with an attribute selector and
 * exfiltrate it. React hydrates by diffing the DOM against what the server
 * rendered, found "" where it had emitted the real nonce, and complained.
 * `suppressHydrationWarning` does not help: Next hoists <head> scripts through
 * its own resource system, which does not carry the prop through.
 *
 * A nonce is the wrong tool here anyway. Nonces exist for inline script whose
 * content varies per request; this script is a constant. Pinning it by hash
 * says something strictly stronger — not "whoever holds this request's token
 * may run inline script" but "this exact source, and nothing else, may run".
 * The element then needs no attribute at all, and the mismatch cannot recur.
 *
 * The hash and the source must agree or the browser silently refuses to run
 * the script and every visitor gets a flash of the wrong theme. They are kept
 * honest by tests/unit/config/theme-init-script.test.ts, which recomputes the
 * digest from the source and fails on drift.
 */

/**
 * Runs before hydration to set data-theme synchronously, preventing a flash of
 * the wrong theme. This is the one deliberate exception to "no inline
 * scripts" — see docs/architecture/security.md.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("origami-engineer-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.dataset.theme = theme;

    var motion = localStorage.getItem("origami-engineer-motion");
    if (motion === "full" || motion === "reduced") {
      document.documentElement.dataset.motion = motion;
    }
  } catch (e) {}
})();
`;

/**
 * Base64 SHA-256 of `themeInitScript`, in the form CSP expects inside
 * `script-src`. Regenerate by running the unit test — it reports the correct
 * value when this one has drifted.
 */
export const themeInitScriptCspHash = "sha256-HpC1sXZKFgEawl5qQ+NzwHwOyJmP2VqlOzIEgZI24hs=";
