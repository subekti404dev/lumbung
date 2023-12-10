import { Box } from "@chakra-ui/react";
import { IVault } from "../../../store/useVault";
import { format } from "date-fns";

type ItemProps = {
  data: IVault;
  onClick: () => void;
};

const Item = ({ data, onClick }: ItemProps) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      border={"1px solid #373A40"}
      _hover={{ border: "1px solid #FFF" }}
      cursor={"pointer"}
      mb={2}
      p={"8px 16px"}
      borderRadius={8}
      onClick={onClick}
    >
      <Box
        flex={1}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        flexDirection={"column"}
        textAlign={"left"}
      >
        <Box fontSize={12} color={"grey"}>
          Name
        </Box>
        <Box mt={"-4px"} fontSize={18}>
          {data.name}
        </Box>
      </Box>
      <Box
        flex={1}
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        flexDirection={"column"}
        textAlign={"right"}
      >
        <Box fontSize={12} color={"grey"}>
          Last Update
        </Box>
        <Box mt={"-4px"} fontSize={18}>
          {format(new Date(data.updated_at), "yyyy/MM/dd HH:mm:ss")}
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
