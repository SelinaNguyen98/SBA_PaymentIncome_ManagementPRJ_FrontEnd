export default function Button({ className, icon, children }) {
  return (
    <button
      className={`bg-green px-4 py-1 rounded-[18px] text-sm flex justify-center items-center flex-shrink-0 ${className}`}
    >
      {icon && <div className=" w-4 h-4 mr-2 items-start">{icon}</div>}

      <span className=" flex-shrink-0 ml-1 text-white font-medium uppercase">
        {children}
      </span>
    </button>
  );
}
