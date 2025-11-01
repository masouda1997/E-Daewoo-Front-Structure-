//Read a CSS variable from :root/html and return a sensible fallback for SSR. Returns trimmed value (e.g. '#344563') or fallback if not available.
function readCssVar(name: string, fallback: string) {
	if (typeof window === 'undefined') return fallback;
	const value = getComputedStyle(document.documentElement).getPropertyValue(
		name,
	);
	return (value || fallback).trim();
}

export { readCssVar };
