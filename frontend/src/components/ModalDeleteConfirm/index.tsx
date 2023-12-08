import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from "@chakra-ui/react";

type IModalDeleteConfirm = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onDelete?: () => void;
};

export const ModalDeleteConfirm = ({
  isOpen,
  onClose,
  name,
  onDelete,
}: IModalDeleteConfirm) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent backgroundColor={"#19181B"} color={"#C1C2C5"}>
        <ModalHeader>Confirn Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>Are you sure want to delete this?</Box>
          <Box>{name}</Box>
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor="#1F2225"
            color={"#C1C2C5"}
            mr={3}
            onClick={onClose}
            _hover={{ backgroundColor: "#2e3236" }}
          >
            No
          </Button>
          <Button
            backgroundColor="#004C38"
            color={"#C1C2C5"}
            _hover={{ backgroundColor: "#025b43" }}
            onClick={() => {
              onDelete?.();
              onClose();
            }}
          >
            {"Yes"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
