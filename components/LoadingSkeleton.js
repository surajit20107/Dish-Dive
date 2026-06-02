/**
 * LoadingSkeleton – pulse placeholder that matches the MealCard dimensions.
 * Use while fetching meal data to avoid layout shift.
 */
export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-200" />

      {/* Text placeholders */}
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded-full w-4/5" />
        <div className="h-3 bg-gray-200 rounded-full w-3/5" />
      </div>
    </div>
  );
}
