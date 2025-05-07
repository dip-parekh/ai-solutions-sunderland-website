
export const EventsLoader = () => {
  return (
    <div className="py-10 space-y-8">
      {/* Featured Event Loader */}
      <div className="bg-gray-100 rounded-lg p-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 h-64 bg-gray-200 rounded-lg"></div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 rounded-md w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded-md"></div>
              <div className="h-3 bg-gray-200 rounded-md"></div>
              <div className="h-3 bg-gray-200 rounded-md w-4/5"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-md w-1/3"></div>
          </div>
        </div>
      </div>
      
      {/* Event Cards Loader */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded-md w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
