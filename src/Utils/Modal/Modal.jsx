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

  return (
    <div
      className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="fixed bg-black/50 top-0 left-0 w-full h-full"></div>
      <div className="w-full flex items-center justify-center z-10">
        {children ? (
          children
        ) : (
          <div className="bg-white p-8 rounded-sm">
            <p className=" text-center mb-8">Are you sure?</p>
            <button onClick={handleOk}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
