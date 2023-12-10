/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
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
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useVaultStore from "../../store/useVault";
import MonacoEditor from "@monaco-editor/react";
import dataFormatter from "../../utils/formatter";
import { CopyBlock, nord } from "react-code-blocks";

type IModalDownload = {
  data?: any;
  isOpen: boolean;
  onClose: () => void;
};

const formInitValue = {
  name: "",
  data: "{}",
};

export const ModalDownload = ({ isOpen, onClose, data }: IModalDownload) => {
  const [form, setForm] = useState(formInitValue);
  const [type, setType] = useState("json");
  const [loading] = useVaultStore((s) => [s.loading]);

  useEffect(() => {
    if (!isOpen) {
      setForm(formInitValue);
      setType("json");
      setForm({
        name: data?.name,
        data: JSON.stringify(data?.data || "{}", null, 3),
      });
    } else {
      if (data) {
        setForm({
          name: data?.name,
          data: JSON.stringify(data?.data || "{}", null, 3),
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (type === "json") {
      setForm({
        name: data?.name,
        data: JSON.stringify(data?.data || "{}", null, 3),
      });
    }
    if (type === "yaml") {
      setForm({
        name: data?.name,
        data: dataFormatter.yaml(data?.data),
      });
    }
    if (type === "toml") {
      setForm({
        name: data?.name,
        data: dataFormatter.toml(data?.data),
      });
    }
    if (type === "dotenv") {
      setForm({
        name: data?.name,
        data: dataFormatter.dotenv(data?.data)?.replace(/\s*=\s*/g, "="),
      });
    }
  }, [type]);

  const curl = `curl --location 'https://${window.location.hostname}/v1/vwt/${data?.id}?type=${type}'
--header 'x-api-token: YOUR_API_TOKEN'`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent backgroundColor={"#19181B"} color={"#C1C2C5"}>
        <ModalHeader>{"Preview"}</ModalHeader>
        {!loading && <ModalCloseButton />}
        <ModalBody>
          <Box>
            <FormLabel mt={4}>Type</FormLabel>
            <Select
              value={type}
              onChange={({ target: { value } }) => {
                setType(value);
              }}
            >
              <option value="json">JSON</option>
              <option value="yaml">Yaml</option>
              <option value="toml">Toml</option>
              <option value="dotenv">DotEnv</option>
            </Select>
            <FormLabel mt={4}>Data</FormLabel>
            <MonacoEditor
              language={type || "json"}
              value={form.data || undefined}
              options={{ automaticLayout: true, readOnly: true }}
              height="30vh"
              theme="vs-dark"
            />
            <FormLabel mt={4}>Curl</FormLabel>
            <CopyBlock
              text={curl}
              language="shell"
              wrapLongLines
              theme={nord}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Box flex={1} />
          <Button
            backgroundColor="#1F2225"
            color={"#C1C2C5"}
            mr={3}
            onClick={onClose}
            _hover={{ backgroundColor: "#2e3236" }}
            isDisabled={loading}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
