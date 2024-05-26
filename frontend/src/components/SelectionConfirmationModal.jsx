import { Modal, Button, List } from "flowbite-react";

const SelectionConfirmationModal = ({
  openModal,
  setOpenModal,
  items,
  onConfirm,
  loading = false,
}) => {
  return (
    <Modal
      dismissible
      size="md"
      show={openModal}
      onClose={() => !loading && setOpenModal(false)}
    >
      <Modal.Header>You have chosen the following items</Modal.Header>
      <Modal.Body>
        <List>
          {items.map((item, idx) => (
            <List.Item key={idx} className="text-base leading-relaxed">
              {item}
            </List.Item>
          ))}
        </List>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="green"
          isProcessing={loading}
          disabled={loading}
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button
          color="red"
          disabled={loading}
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectionConfirmationModal;
