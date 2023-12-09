import {
  IconButton,
  Avatar,
  Flex,
  HStack,
  VStack,
  Text,
  FlexProps,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"#202123"}
      color={"gray.200"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.700"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        _hover={{ backgroundColor: "#000" }}
        onClick={onOpen}
        color={"gray.200"}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        urVault
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{"Urip"}</Text>
                    <Text fontSize="xs" color="gray.600">
                      SoftEng
                    </Text>
                  </VStack>
                </>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
