const ORIGINAL_FRAME_SIZE = 36;

// Put the RAW coordinates (measured at 36px size) here
const RAW_Y_OFFSETS = {
  home: -2082,
  inPlay: -1965.5,
  hundredCup: -2284,
  cricket: -418.7,
  soccer: -1318.8,
  tennis: -1409.5,
  poker: -1109,
  pokerII: -2239,
  rvGames: -2195,
  allGames: -599,
};

/**
 * @typedef {{
 *   name: keyof typeof RAW_Y_OFFSETS,
 *   size?: number,
 *   className?: string,
 * }} SportIconProps
 */

/**
 * @param {SportIconProps} props
 */
export default function SportIcon({ name, size = 18, className = "" }) {
  const rawY = RAW_Y_OFFSETS[name];

  if (rawY === undefined) return null;

  // Auto-scale position based on target size
  const scale = size / ORIGINAL_FRAME_SIZE;
  const scaledY = rawY * scale;

  return (
    <span
      className={`react-sports-icon ${className}`}
      style={{
        width: `${size}px`,
        height: `${size - 4.8}px`,
        backgroundSize: `${size}px auto`,
        backgroundPosition: `0px ${scaledY}px`,
      }}
      aria-label={`${name} icon`}
    />
  );
}
