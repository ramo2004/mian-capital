export default function ViewportVisual({ children }) {
  return (
    <div className="visual-activation" aria-hidden="true">
      {children}
    </div>
  );
}
