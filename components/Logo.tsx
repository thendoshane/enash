export default function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`logo ${footer ? "logo-footer" : ""}`} aria-label="ENASH">
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-e"><i /><i /><i /></span>
        <span className="logo-dot" />
      </span>
      <span className="logo-word">enash</span>
    </span>
  );
}
