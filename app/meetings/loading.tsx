export default function Loading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}

