export function extractQueryString(url) {
  if (!url) {
    return new URLSearchParams();
  }

  try {
    return new URL(url).searchParams;
  } catch {
    const base =
      import.meta.env.VITE_API_URL || window.location.origin || "http://localhost";
    return new URL(url, base).searchParams;
  }
}
