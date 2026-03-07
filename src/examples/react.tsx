import { useState } from "react";

export default function ThemeSandbox() {
  const [dark, setDark] = useState(true);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        background: dark ? "#111" : "#f7f7f7",
        color: dark ? "#f7f7f7" : "#111",
        transition: "background 180ms ease, color 180ms ease"
      }}
    >
      <button
        type="button"
        onClick={() => setDark((v) => !v)}
        style={{
          border: "1px solid currentColor",
          background: "transparent",
          color: "inherit",
          borderRadius: 8,
          padding: "0.5rem 0.75rem",
          cursor: "pointer"
        }}
      >
        Toggle theme
      </button>

      <section style={{ marginTop: "1.25rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Theme test surface</h1>
        <p style={{ opacity: 0.8, marginTop: "0.75rem", maxWidth: 600 }}>
          Minimal React/TSX boilerplate for testing color tokens and typography.
        </p>
      </section>
    </main>
  );
}
