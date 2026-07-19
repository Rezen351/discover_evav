import { useCallback } from "react";

type SpotlightEvent = React.MouseEvent<HTMLElement>;

interface SpotlightOptions {
  /** Radius of the radial gradient in px. Default 120. */
  radius?: number;
  /** Inner color (center of the glow). Default white for light sections. */
  from?: string;
  /** Mid color. Default var(--color-accent-pink). */
  mid?: string;
  /** Outer color. Default var(--color-accent-navy). */
  to?: string;
}

/**
 * Cursor-following spotlight effect for CTA buttons (GRAND_DESIGN §5.3 / §13).
 * Returns onMouseMove/onMouseLeave handlers to spread onto any button or anchor.
 * The radial gradient tracks the pointer; clearing on leave restores the
 * `.btn-spotlight` base (transparent) so the border/text hover rules take over.
 */
export function useSpotlight({
  radius = 120,
  from = "#FFFFFF",
  mid = "var(--color-accent-pink)",
  to = "var(--color-accent-navy)",
}: SpotlightOptions = {}) {
  const onMouseMove = useCallback(
    (e: SpotlightEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.background = `radial-gradient(circle ${radius}px at ${x}px ${y}px, ${from} 0%, ${mid} 35%, ${to} 70%, ${to} 100%)`;
    },
    [radius, from, mid, to]
  );

  const onMouseLeave = useCallback((e: SpotlightEvent) => {
    e.currentTarget.style.background = "";
  }, []);

  return { onMouseMove, onMouseLeave };
}
