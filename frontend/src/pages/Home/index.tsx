/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, chakra, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FloatingButton from "../../components/FloatingButton";
import { ModalForm } from "../../components/ModalForm";
import useMemoryStore from "../../store/useMemory";
import useVaultStore from "../../store/useVault";
import Item from "./components/Item";
import { ModalDownload } from "../../components/ModalDownload";

const PlusIcon = chakra(FaPlus);

export const HomePage = () => {
  const [vaults, getVaults] = useVaultStore((store) => [
    store.vaults,
    store.getVaults,
  ]);
  const [memory] = useMemoryStore((store) => [store.memory]);
  const [dataToEdit, setDataToEdit] = useState<any>(null);
  const [dataToDownload, setDataToDownload] = useState<any>(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDownload,
    onClose: onCloseDownload,
    onOpen: onOpenDownload,
  } = useDisclosure();

  useEffect(() => {
    getVaults();
  }, []);

  return (
    <>
      <Box
        backgroundColor={"#25262B"}
        textAlign="center"
        fontSize="xl"
        color={"#C1C2C5"}
        paddingBottom={12}
      >
        <Box
          margin={[2, 4, 6, 8]}
          textAlign={"left"}
          backgroundColor={"#202123"}
          padding={[2, 4, 6, 8]}
          borderRadius={16}
          border={"1px solid #373A40"}
          display={"flex"}
          flexDirection={"row"}
        >
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box fontSize={12}>Total Memory</Box>
            <Box fontWeight={600} fontSize={"24px"}>
              {!!memory &&
                ((memory.memory.total || 0) / (1024 * 1024)).toFixed(2)}
              {" GB"}
            </Box>
          </Box>
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box fontSize={12}>Memory Usage</Box>
            <Box fontWeight={600} fontSize={"24px"}>
              {!!memory &&
                ((memory.memory.used || 0) / (1024 * 1024)).toFixed(2)}
              {" GB"}
            </Box>
          </Box>
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box fontSize={12}>Memory Usage (%)</Box>
            <Box fontWeight={600} fontSize={"24px"}>
              {!!memory && memory.memory.percentage.toFixed(2)}
              {" %"}
            </Box>
          </Box>
        </Box>

        <Box margin={[2, 4, 6, 8]}>
          {vaults.map((v, i) => {
            return (
              <Item
                key={i}
                data={v}
                onClick={() => {
                  setDataToEdit(v);
                  onOpen();
                }}
              />
            );
          })}
        </Box>
        <FloatingButton onClick={onOpen}>
          <PlusIcon />
        </FloatingButton>
        <ModalForm
          data={dataToEdit}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setDataToEdit(null);
          }}
          onDownload={() => {
            setDataToDownload(dataToEdit);
            onClose();
            setDataToEdit(null);
            onOpenDownload();
          }}
        />
        <ModalDownload
          data={dataToDownload}
          isOpen={isOpenDownload}
          onClose={() => {
            onCloseDownload();
            setDataToDownload(null);
          }}
        />
      </Box>
    </>
  );
};
