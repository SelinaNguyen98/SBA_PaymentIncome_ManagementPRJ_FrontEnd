import "./styles.css";
// eslint-disable-next-line no-unused-vars
const root = document.getElementById("root");
// const root = document.getElementById("contentInvoiceDetail");

// eslint-disable-next-line react/prop-types
export default function Modal({ visible = false, ok, cancel, children }) {
  const handleOk = () => {
    ok();
  };

  const handleCancel = () => {
    cancel();
  };
  // createPortal

  // return (
  //   <div
  //     className="modalRoot "
  //     style={{ visibility: visible ? "visible" : "hidden" }}
  //   >
  //     <div className="container">
  //       <div className="confirm">
  //         <p className="title">Are you sure?</p>
  //         <button onClick={handleOk}>OK</button>
  //         <button onClick={handleCancel}>Cancel</button>
  //       </div>
  //     </div>

  //     <div className="overlay bg-slate-500/10"></div>
  //   </div>
  // );

  return (
    <div
      className=" modalRoot"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="overlay bg-slate-500/10"></div>
      <div className="w-full flex items-center justify-center translate-x-[-4vw]">
        {children ? (
          children
        ) : (
          <div className="confirm">
            <p className="title">Are you sure?</p>
            <button onClick={handleOk}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
