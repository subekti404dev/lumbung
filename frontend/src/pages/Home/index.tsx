/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, chakra } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import FloatingButton from "../../components/FloatingButton";
import { ModalForm } from "../../components/ModalForm";
import useVaultStore from "../../store/useVault";
import Item from "./components/Item";
import { ModalPreview } from "../../components/ModalPreview";
import useDisclosureWithData from "../../hooks/useDisclosureWithData";

const PlusIcon = chakra(FaPlus);

export const HomePage = () => {
  const [vaults, getVaults] = useVaultStore((store) => [
    store.vaults,
    store.getVaults,
  ]);

  const modalForm = useDisclosureWithData();
  const modalPreview = useDisclosureWithData();

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
        <Box margin={[2, 4, 6, 8]}>
          {vaults.map((v, i) => {
            return (
              <Item
                key={i}
                data={v}
                onClick={() => {
                  modalForm.setData(v);
                  modalForm.onOpen();
                }}
              />
            );
          })}
        </Box>
        <FloatingButton onClick={modalForm.onOpen}>
          <PlusIcon />
        </FloatingButton>
        <ModalForm
          data={modalForm.data}
          isOpen={modalForm.isOpen}
          onClose={() => {
            modalForm.onClose();
            modalForm.setData(null);
          }}
          onPreview={() => {
            modalPreview.setData(modalForm.data);
            // modalForm.onClose();
            // modalForm.setData(null);
            modalPreview.onOpen();
          }}
        />
        <ModalPreview
          data={modalPreview.data}
          isOpen={modalPreview.isOpen}
          onClose={() => {
            modalPreview.onClose();
            modalPreview.setData(null);
          }}
        />
      </Box>
    </>
  );
};
