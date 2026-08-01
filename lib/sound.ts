let muted = false; // Enable audio by default

export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  return muted;
}

export function setMuted(val: boolean) {
  muted = val;
}
