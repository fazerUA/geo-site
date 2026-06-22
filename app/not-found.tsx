import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl font-semibold">404</h1>
      <p className="blog-lead mt-4 max-w-md leading-7">
        Страница не найдена. Возможно, она была перемещена или удалена.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] px-7 py-3 text-sm font-semibold text-[#24180c] shadow-[0_10px_30px_rgba(222,173,96,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,173,96,0.48)]"
      >
        На главную
      </Link>
    </main>
  );
}
