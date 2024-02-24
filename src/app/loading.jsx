function Loading() {
  return (
    <div className="w-full h-[90%] lg:h-[80%] flex justify-center items-center">
      <div className="flex gap-2 items-center">
        <span className="w-2 lg:w-4 h-4 lg:h-8 bg-transparent-dark-blue rounded-lg relative overflow-hidden animate-loader1">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-light-blue"></span>
        </span>
        <span className="w-2 lg:w-4 h-10 lg:h-20 bg-light-blue rounded-lg relative overflow-hidden animate-loader2">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-dark-blue"></span>
        </span>
        <span className="w-2 lg:w-4 h-20 lg:h-40 bg-transparent-dark-blue rounded-lg relative overflow-hidden animate-loader3">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-light-blue"></span>
        </span>
        <span className="w-2 lg:w-4 h-14 lg:h-28 bg-light-blue rounded-lg relative overflow-hidden animate-loader4">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-dark-blue"></span>
        </span>
        <span className="w-2 lg:w-4 h-8 lg:h-16 bg-transparent-dark-blue rounded-lg relative overflow-hidden animate-loader5">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-dark-blue"></span>
        </span>
        <span className="w-2 lg:w-4 h-14 lg:h-28 bg-light-blue rounded-lg relative overflow-hidden animate-loader6">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-dark-blue"></span>
        </span>
        <span className="w-2 lg:w-4 h-4 lg:h-8 bg-transparent-dark-blue rounded-lg relative overflow-hidden animate-loader7">
          <span className="absolute w-full h-[50%] right-0 bottom-0 bg-light-blue"></span>
        </span>
      </div>
    </div>
  );
}

export default Loading;
