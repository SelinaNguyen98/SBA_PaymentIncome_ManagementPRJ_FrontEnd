import "./styles.css";
// eslint-disable-next-line no-unused-vars
const root = document.getElementById("root");
// const root = document.getElementById("contentInvoiceDetail");

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
      className=" modalRoot"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="overlay bg-slate-500/10"></div>
      <div className={` containerModal  ${classNameContainer}  `}>
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
