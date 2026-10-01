export const metadata = {
  title: "Редактор контента — art-web-geo",
  robots: { index: false, follow: false },
};

/** Decap в отдельном HTML без обёртки Next (корректный local_backend и GitHub login). */
export default function AdminPage() {
  return (
    <iframe
      src="/admin/cms.html"
      title="Decap CMS"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
      }}
    />
  );
}
