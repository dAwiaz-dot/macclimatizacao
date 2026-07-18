"use client";

import { useEffect, useState } from "react";

export function useHideOnFooter() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -1px 0px" }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return hidden;
}
