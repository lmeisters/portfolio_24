export function HeaderSkeleton() {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="text-md font-semibold">LM</div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>
    );
}
