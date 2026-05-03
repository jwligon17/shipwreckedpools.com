"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackAnalyticsEvent } from "@/lib/analytics";

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    let attachTimerId: number | null = null;

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackAnalyticsEvent("phone_click", {
          link_url: href,
          page_path: pathname ?? "",
        });
        return;
      }

      if (href.startsWith("sms:")) {
        trackAnalyticsEvent("text_click", {
          link_url: href,
          page_path: pathname ?? "",
        });
      }
    }

    attachTimerId = window.setTimeout(() => {
      document.addEventListener("click", handleClick, true);
    }, 0);

    return () => {
      if (attachTimerId !== null) {
        window.clearTimeout(attachTimerId);
      }
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname]);

  return null;
}
