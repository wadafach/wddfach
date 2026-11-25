/** Public asset paths work locally and under the GitHub Pages repository path. */
export function publicAsset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? "/wddfach" : "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
