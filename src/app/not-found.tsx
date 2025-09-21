import Link from "next/link";

const NotFound = ({ message }: { message?: string }) => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl text-center">
        <div className="rounded-2xl border bg-white shadow-sm p-10">
          <p className="text-sm font-semibold text-blue-600">404</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {message
              ? message
              : "The page you’re looking for doesn’t exist or has been moved."}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Go to Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Search products
            </Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Need help? Contact support.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
