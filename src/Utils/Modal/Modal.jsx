import "./styles.css";
// eslint-disable-next-line no-unused-vars
const root = document.getElementById("root");

/**
 *
 *   <Modal>  {children} </Modal>
 *   Tu css style cho classNameContainer
 */
export default function Modal({
  visible = false,
  ok,
  cancel,
  children,
  classNameContainer,
}) {
  const handleOk = () => {
    ok();
  };

  const handleCancel = () => {
    cancel();
  };

  return (
    <div
      className=" absolute top-0 left-0 right-0 bottom-0 justify-center items-center inset-0 bg-black/50 opacity-100 transition-opacity duration-225 ease-in-out "
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className=" fixed flex items-center justify-center inset-0 bg-slate-500/10 -z-[1] opacity-100 transition-opacity duration-225 ease-in-out"></div>
      <div
        className={` flex justify-center items-center  ${classNameContainer}  `}
      >
        {children ? (
          children
        ) : (
          <div className="bg-white p-8 rounded-lg ">
            <p className=" text-center mb-8">Are you sure?</p>
            <button onClick={handleOk}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
