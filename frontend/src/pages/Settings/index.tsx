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
import EmptyState from "../../components/EmptyState";
import { FaArrowDown } from "react-icons/fa";

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

  const modalGenerateToken = useDisclosure();
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
          <Accordion borderColor={"gray.600"} allowToggle>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      borderBottomWidth={1}
                      borderColor={"gray.700"}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize={20}
                        fontWeight={600}
                      >
                        API Token
                      </Box>
                      {!isExpanded && <FaArrowDown />}

                      {isExpanded && (
                        <Button
                          backgroundColor="#004C38"
                          color={"#C1C2C5"}
                          _hover={{ backgroundColor: "#025b43" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            modalGenerateToken.onOpen();
                          }}
                          size={"sm"}
                        >
                          New Token
                        </Button>
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {tokens.length === 0 && (
                      <EmptyState
                        message="You haven’t added any token."
                        createNewLabelBtn="Generate Token"
                        onCreateNew={modalGenerateToken.onOpen}
                      />
                    )}
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
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
      <ModalGenToken
        isOpen={modalGenerateToken.isOpen}
        onClose={modalGenerateToken.onClose}
      />
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
