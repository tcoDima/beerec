import "./BottomNav.css";
import ConfirmationModal from "./ConfirmationModal";

const Nav = ({
  showPage,
  pageState,
  finishGame,
  isLocked,
  openModal,
  showModal,
  closeModal,
  selectedGameId,
}: any) => {
  const confirmFinishGame = () => {
    closeModal();
    finishGame(selectedGameId);
    console.log(`Game with id: ${selectedGameId} has been deleted.`);
    showPage("gameListNew");
  };
  return (
    <div
      style={{
        flexDirection: pageState.home ? "column" : "row",
        marginTop: pageState.home && "100px",
      }}
      className="wrapper bottom-nav"
    >
      <div className="outer">
        <button
          style={{
            minWidth: pageState.home && "400px",
          }}
          onClick={() => {
            showPage("gameListNew");
          }}
          className="inner n-button"
        >
          Historie her
        </button>
      </div>
      <div className="outer">
        <button
          style={{
            minWidth: pageState.home && "400px",
          }}
          onClick={() => {
            showPage("createNewGame");
          }}
          className="inner n-button"
        >
          Nová hra
        </button>
      </div>
      {pageState.activeGame && (
        <div className="outer">
          <button
            onClick={() => openModal(selectedGameId)}
            disabled={isLocked}
            className="inner n-button"
          >
            Ukončit hru
          </button>
        </div>
      )}
      {!selectedGameId && (
        <ConfirmationModal
          isOpen={showModal}
          onConfirm={confirmFinishGame}
          onCancel={closeModal}
          modalParagraphText={
            "Ukončením hry se určí víťěz.\nHra se uzamkne a nepůjde dále upravovat.\nOpravdu chcete ukončit hru?"
          }
          modalButtonText="Ukončit"
        />
      )}
    </div>
  );
};

export default Nav;
