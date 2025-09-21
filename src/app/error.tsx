"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  // Optional: log to your monitoring tool
  useEffect(() => {
    // e.g., Sentry.captureException(error);
    // console.error(error);
  }, [error]);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border bg-white shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              An unexpected error occurred while rendering this page. You can
              try again, or head back home.
            </p>
          </div>

          {/* Helpful actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Go to Home
            </Link>
          </div>

          {/* Extra diagnostics (only in dev) */}
          {isDev && (
            <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm text-gray-800">
              <p className="font-medium">Debug info (dev only)</p>
              <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words">
                {error?.message || "Unknown error"}
              </pre>
              {error?.digest && (
                <p className="mt-2 text-xs text-gray-600">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <p className="mt-4 text-center text-xs text-gray-500">
          If the issue persists, please contact support.
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
