export function nextImageUrl({
  url,
  width,
  quality,
}: {
  url: string;
  width: number;
  quality: number;
}) {
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
}
