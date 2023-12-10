/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const useDisclosureWithData = () => {
  const [data, setData] = useState<any>(null);
  const disclosure = useDisclosure();

  return {
    ...disclosure,
    data,
    setData,
  };
};

export default useDisclosureWithData;
