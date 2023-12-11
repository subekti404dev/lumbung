/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTokenStore from "../../store/useToken";
import { ModalGenToken } from "../../components/ModalGenToken";
import { ModalDeleteConfirm } from "../../components/ModalDeleteConfirm";

export const SettingPage = () => {
  const [tokens, getTokens, revokeToken, loading] = useTokenStore((s) => [
    s.tokens,
    s.getTokens,
    s.revokeToken,
    s.loading,
  ]);

  const [tokenToDelete, setTokenToDelete] = useState<any>(null);
  useEffect(() => {
    getTokens();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalConfirmDelete = useDisclosure();

  return (
    <>
      <Box
        backgroundColor={"#25262B"}
        fontSize="xl"
        color={"#C1C2C5"}
        paddingBottom={12}
      >
        <Box margin={[2, 4, 6, 8]}>
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={20}
                    fontWeight={600}
                  >
                    API Token
                  </Box>

                  <Button
                    backgroundColor="#004C38"
                    color={"#C1C2C5"}
                    _hover={{ backgroundColor: "#025b43" }}
                    onClick={onOpen}
                    size={"sm"}
                  >
                    New Token
                  </Button>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {tokens.map((t, i) => {
                  return (
                    <Box key={i} display={"flex"} mb={1}>
                      <Box flex={1} fontSize={18}>
                        {t.name}
                      </Box>
                      <Box>
                        <Button
                          backgroundColor="#7e0b06"
                          color={"#C1C2C5"}
                          size={"sm"}
                          onClick={() => {
                            setTokenToDelete(t);
                            modalConfirmDelete.onOpen();
                          }}
                        >
                          Revoke
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          {/* <Box
            display={"flex"}
            flexDirection={"row"}
            borderBottom={"1px solid gray"}
            pb={2}
          >
            <Box flex={1}>API Token</Box>
            <Button
              backgroundColor="#004C38"
              color={"#C1C2C5"}
              _hover={{ backgroundColor: "#025b43" }}
              onClick={onOpen}
              size={"sm"}
            >
              New Token
            </Button>
          </Box>
          <Box mt={4}>
            {tokens.map((t, i) => {
              return (
                <Box key={i} display={"flex"} mb={1}>
                  <Box flex={1} fontSize={18}>
                    {t.name}
                  </Box>
                  <Box>
                    <Button
                      backgroundColor="#7e0b06"
                      color={"#C1C2C5"}
                      size={"sm"}
                      onClick={() => {
                        setTokenToDelete(t);
                        modalConfirmDelete.onOpen();
                      }}
                    >
                      Revoke
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box> */}
        </Box>
      </Box>
      <ModalGenToken isOpen={isOpen} onClose={onClose} />
      <ModalDeleteConfirm
        isOpen={modalConfirmDelete.isOpen}
        onClose={() => {
          modalConfirmDelete.onClose();
          setTokenToDelete(null);
        }}
        name={tokenToDelete?.name}
        onDelete={async () => {
          await revokeToken(tokenToDelete?.token);
        }}
        loading={loading}
      />
    </>
  );
};
