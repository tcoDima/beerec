import "./ConfirmationModal.css";
import sticker from "../assets/sticker.png";

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  modalParagraphText,
  modalButtonText,
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-outer outer">
        <div className="modal">
          <img src={sticker} />
          <p style={{ whiteSpace: "pre-wrap" }}>{modalParagraphText}</p>
          <div className="button-wrapper">
            <div className="outer">
              <button onClick={onCancel} className="n-button inner">
                Zpět
              </button>
            </div>
            <div className="outer primary">
              <button
                onClick={onConfirm}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onConfirm();
                  }
                }}
                className="n-button inner"
              >
                {modalButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
