import { toast } from "react-toastify";

export default function useConfirm() {
  const confirm = ({
    onConfirm,
    message = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmBtnClass = "btn btn-danger btn-sm",
    cancelBtnClass = "btn btn-secondary btn-sm",
  }) => {
    const toastId = toast.warning(
      () => (
        <div className="text-danger fw-medium">
          <p>{message}</p>
          <div className="d-flex gap-2 mt-2">
            <button
              className={confirmBtnClass}
              onClick={() => {
                onConfirm();
                toast.dismiss(toastId);
              }}
            >
              {confirmText}
            </button>
            <button
              className={cancelBtnClass}
              onClick={() => toast.dismiss(toastId)}
            >
              {cancelText}
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );
  };

  return confirm;
}
