/**
 * Сюда вставьте код счётчика Яндекс.Метрики из кабинета Метрики (как есть по частям ниже).
 *
 * --- Скрипт ---
 * Скопируйте только то, что между тегами
 *   <script type="text/javascript">  и  </script>
 * (сами теги <script> … </script> не копируйте), и вставьте между кавычками в `metrikaScriptInner`.
 *
 * --- Noscript (по желанию) ---
 * Если в выдаче Метрики есть блок <noscript>…</noscript>, скопируйте всё **внутри**
 * <noscript> (обычно <div><img …></div>) в `metrikaNoscriptInnerHtml`.
 * Если второго блока нет — оставьте пустую строку.
 *
 * Если оба поля пустые — счётчик на сайт не подключается.
 *
 * Важно: URL загрузчика должен быть ровно `https://mc.yandex.ru/metrika/tag.js`
 * (без `?id=...` в конце — иначе скрипт может не загрузиться и ломать страницу).
 */

export const metrikaScriptInner = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(109166384, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});
`.trim();

export const metrikaNoscriptInnerHtml = `<div><img src="https://mc.yandex.ru/watch/109166384" style="position:absolute; left:-9999px;" alt="" /></div>`;
