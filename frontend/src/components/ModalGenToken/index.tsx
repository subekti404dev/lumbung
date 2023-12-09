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
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTokenStore from "../../store/useToken";

type IModalGenToken = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalGenToken = ({ isOpen, onClose }: IModalGenToken) => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  const [generateToken, loading] = useTokenStore((s) => [
    s.generateToken,
    s.loading,
  ]);

  const toast = useToast();

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setToken("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent backgroundColor={"#19181B"} color={"#C1C2C5"}>
        <ModalHeader>Generate New Token</ModalHeader>
        {!loading && <ModalCloseButton />}
        <ModalBody>
          <Box>
            <FormLabel mt={4}>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              isDisabled={loading || !!token}
            />
            {token && (
              <>
                <FormLabel mt={4}>Token</FormLabel>
                <Input value={token} isDisabled />
              </>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor="#1F2225"
            color={"#C1C2C5"}
            mr={3}
            onClick={onClose}
            _hover={{ backgroundColor: "#2e3236" }}
          >
            Close
          </Button>
          {!token && (
            <Button
              backgroundColor="#004C38"
              color={"#C1C2C5"}
              _hover={{ backgroundColor: "#025b43" }}
              onClick={async () => {
                const t = await generateToken(name);
                setToken(t);
              }}
              isDisabled={loading || !name}
            >
              {loading ? <Spinner /> : "Generate"}
            </Button>
          )}
          {token && (
            <Button
              backgroundColor="#004C38"
              color={"#C1C2C5"}
              _hover={{ backgroundColor: "#025b43" }}
              onClick={() => {
                navigator.clipboard.writeText(token);
                toast({
                  title: "Token copied to clipboard",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }}
              isDisabled={loading || !name}
            >
              {"Copy to Clipboard"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
