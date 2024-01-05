export default function Button({ className, icon, children, ...refs }) {
  return (
    <button
      {...refs}
      className={` bg-green text-white px-4 py-1 rounded-[18px] hover:opacity-80 text-sm flex justify-center items-center flex-shrink-0 font-medium uppercase  ${className}  `}
    >
      {icon && <div className=" w-4 h-4 mr-2 items-start">{icon}</div>}

      {/* <span className="  ml-1 text-white font-medium uppercase"> */}
      {children}
      {/* </span> */}
    </button>
  );
}
