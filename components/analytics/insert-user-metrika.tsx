"use client";

import Script from "next/script";
import {
  metrikaNoscriptInnerHtml,
  metrikaScriptInner,
} from "@/lib/yandex-metrika-snippet";

/** Подключает код из `lib/yandex-metrika-snippet.ts` ко всем страницам через `app/layout.tsx`. */
export default function InsertUserMetrika() {
  const script = metrikaScriptInner.trim();
  if (!script) {
    return null;
  }

  const nos = metrikaNoscriptInnerHtml.trim();

  return (
    <>
      <Script id="user-yandex-metrika" strategy="afterInteractive">
        {script}
      </Script>
      {nos ? <noscript dangerouslySetInnerHTML={{ __html: nos }} /> : null}
    </>
  );
}
