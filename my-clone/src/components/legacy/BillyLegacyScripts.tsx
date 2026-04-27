"use client";

import { useEffect } from "react";

// 与 billysweeney.com 的加载顺序一致：modernizr -> jquery -> easing -> site script

const SCRIPTS: { src: string; key: string }[] = [
  { key: "modernizr", src: "/billy-legacy/scripts/modernizr.js" },
  { key: "jquery", src: "/billy-legacy/scripts/jquery-3.7.1.min.js" },
  { key: "easing", src: "/billy-legacy/scripts/jquery-easing-1.4.1.js" },
  { key: "site", src: "/billy-legacy/scripts/script.js" },
];

function appendScript(
  { src, key }: { src: string; key: string },
  onload?: () => void,
) {
  if (document.querySelector(`script[data-billy-legacy=\"${key}\"]`)) {
    onload?.();
    return;
  }
  const el = document.createElement("script");
  el.src = src;
  el.async = false;
  el.dataset.billyLegacy = key;
  if (onload) el.onload = onload;
  document.body.appendChild(el);
}

function loadChain(i: number) {
  if (i >= SCRIPTS.length) return;
  appendScript(SCRIPTS[i]!, () => loadChain(i + 1));
}

export function BillyLegacyScripts() {
  useEffect(() => {
    if (document.documentElement.dataset.billyLegacyBootstrapped === "1") return;
    document.documentElement.dataset.billyLegacyBootstrapped = "1";
    loadChain(0);
  }, []);

  return null;
}
