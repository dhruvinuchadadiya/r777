const ORIGINAL_FRAME_SIZE = 36;

// Put the RAW coordinates (measured at 36px size) here
const RAW_Y_OFFSETS = {
  home: -2082,
  inPlay: -1965.5,
  hundredCup: -2278,
  cricket: -420.5,
  soccer: -1319.5,
  tennis: -1409.5,
  poker: -1109,
  pokerII: -2237,
  rvGames: -2195,
  allGames: -599,
};

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
        height: `${size - 4.5}px`,
        backgroundSize: `${size}px auto`,
        backgroundPosition: `0px ${scaledY}px`,
      }}
      aria-label={`${name} icon`}
    />
  );
}
