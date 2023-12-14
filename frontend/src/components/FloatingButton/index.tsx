/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@chakra-ui/react";
// margin={[2, 4, 6, 8]}
interface IFloatingButton {
  onClick?: () => void;
  children?: any;
  isDisabled?: boolean;
}
const FloatingButton = ({ onClick, children, isDisabled }: IFloatingButton) => {
  return (
    <Button
      position={"absolute"}
      bottom={["20px", "40px", "60px"]}
      right={["20px", "40px", "60px"]}
      onClick={onClick}
      backgroundColor={"#25262B"}
      color={"#fff"}
      fontSize={"30px"}
      height={"50px"}
      width={"50px"}
      borderRadius={"18px"}
      border={"1px solid #373A40"}
      isDisabled={isDisabled}
      _hover={{ backgroundColor: "#19181B" }}
    >
      {children}
    </Button>
  );
};

export default FloatingButton;
