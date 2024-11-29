export const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-spin" />
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-purple-600 rounded-full animate-spin" />
    </div>
  </div>
); 