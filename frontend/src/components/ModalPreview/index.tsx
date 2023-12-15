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
import base64 from "base-64";
import { CopyBlock, nord } from "react-code-blocks";
import useTokenStore from "../../store/useToken";

type IModalPreview = {
  data?: any;
  isOpen: boolean;
  onClose: () => void;
};

const formInitValue = {
  name: "",
  data: "{}",
};

export const ModalPreview = ({ isOpen, onClose, data }: IModalPreview) => {
  const [form, setForm] = useState(formInitValue);
  const [type, setType] = useState("json");
  const [token, setToken] = useState("");
  const [loading] = useVaultStore((s) => [s.loading]);
  const [tokens, getTokens] = useTokenStore((s) => [s.tokens, s.getTokens]);

  useEffect(() => {
    getTokens();
  }, []);

  useEffect(() => {
    if (tokens.length > 0) {
      setToken(tokens[0].token);
    }
  }, [tokens]);

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

  const curl = `curl --location 'https://${window.location.hostname}/v1/vwt/${data?.id}?type=${type}' \
--header 'x-api-token: YOUR_API_TOKEN'`;

  const ghaSecret = `${base64.encode(
    `https://${window.location.hostname}|${data?.id}|${token}`
  )}`
    .split("")
    .reverse()
    .join("");

  const Option = (props: any) => {
    const { children, ...other } = props || {};
    return (
      <option style={{ backgroundColor: "#000", color: "#FFF" }} {...other}>
        {children}
      </option>
    );
  };

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
              <Option value="json">JSON</Option>
              <Option value="yaml">Yaml</Option>
              <Option value="toml">Toml</Option>
              <Option value="dotenv">DotEnv</Option>
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
            <FormLabel mt={4}>GHA Secret</FormLabel>
            <Select
              value={token}
              onChange={({ target: { value } }) => {
                setToken(value);
              }}
            >
              {tokens.map((t, i) => (
                <Option key={i} value={t.token}>
                  {t.name}
                </Option>
              ))}
            </Select>
            {!!token && (
              <CopyBlock
                text={ghaSecret}
                language="shell"
                wrapLongLines
                theme={nord}
              />
            )}
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
