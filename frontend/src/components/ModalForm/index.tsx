/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useVaultStore from "../../store/useVault";
import MonacoEditor from "@monaco-editor/react";
import { ModalDeleteConfirm } from "../ModalDeleteConfirm";

type IModalForm = {
  data?: any;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
};

const formInitValue = {
  name: "",
  data: "{}",
};

export const ModalForm = ({
  isOpen,
  onClose,
  onDownload,
  data,
}: IModalForm) => {
  const [form, setForm] = useState(formInitValue);
  const [isValid, setIsvalid] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, addVault, updateVault, deleteVault] = useVaultStore((s) => [
    s.loading,
    s.addVault,
    s.updateVault,
    s.deleteVault,
  ]);

  const handleEditorChange = (data: any) => {
    setForm((f: any) => ({ ...f, data }));
    try {
      JSON.parse(data);
      setIsvalid(true);
    } catch (e) {
      setIsvalid(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setForm(formInitValue);
    } else {
      if (data) {
        setForm({
          name: data?.name,
          data: JSON.stringify(data?.data || "{}", null, 3),
        });
      }
    }
  }, [isOpen]);

  const isDisabled = !form.name || !form.data || !isValid;

  const handleSubmit = async () => {
    const { name, data: dataToPost } = form;
    if (data) {
      await updateVault(data?.id, data?.name, dataToPost, onClose);
    } else {
      await addVault(name, dataToPost, onClose);
    }
  };

  const handleDelete = async () => {
    await deleteVault(data?.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent backgroundColor={"#19181B"} color={"#C1C2C5"}>
        <ModalHeader>{data ? "Update" : "Create New"}</ModalHeader>
        {!loading && <ModalCloseButton />}
        <ModalBody>
          <Box>
            {data && (
              <>
                <FormLabel mt={4}>Id</FormLabel>
                <Input value={data.id} isDisabled />
              </>
            )}
            <FormLabel mt={4}>Name</FormLabel>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              isDisabled={loading || data}
            />
            <FormLabel mt={4}>Data</FormLabel>
            <MonacoEditor
              language="json"
              value={form.data || undefined}
              onChange={handleEditorChange}
              options={{ automaticLayout: true, readOnly: false }}
              height="45vh"
              theme="vs-dark"
            />
          </Box>
          {!isValid && (
            <Box mt={2} color={"red"}>
              Invalid JSON
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          {data && (
            <>
              <Button
                backgroundColor="#7e0b06"
                color={"#C1C2C5"}
                mr={3}
                onClick={() => setShowDeleteConfirmation(true)}
                _hover={{ backgroundColor: "#a60b04" }}
                isDisabled={loading}
              >
                Delete
              </Button>
              <Button
                backgroundColor="#1F2225"
                color={"#C1C2C5"}
                _hover={{ backgroundColor: "#2e3236" }}
                mr={3}
                onClick={onDownload}
                isDisabled={loading}
              >
                Preview
              </Button>
            </>
          )}
          <Box flex={1} />
          <Button
            backgroundColor="#1F2225"
            color={"#C1C2C5"}
            _hover={{ backgroundColor: "#2e3236" }}
            mr={3}
            onClick={onClose}
            isDisabled={loading}
          >
            Close
          </Button>
          <Button
            backgroundColor="#004C38"
            color={"#C1C2C5"}
            _hover={{ backgroundColor: "#025b43" }}
            onClick={() => {
              handleSubmit();
            }}
            isDisabled={loading || isDisabled}
          >
            {loading ? <Spinner /> : data ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
      <ModalDeleteConfirm
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onDelete={handleDelete}
        name={data?.name}
      />
    </Modal>
  );
};
