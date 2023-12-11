import { Box, Heading, Stack, Button } from "@chakra-ui/react";

type IEmptyState = {
  message: string;
  onCreateNew?: () => void;
  createNewLabelBtn?: string;
};

const EmptyState = ({
  message,
  onCreateNew,
  createNewLabelBtn,
}: IEmptyState) => (
  <Box
    backgroundColor="#202123"
    ml={0}
    mr={0}
    borderRadius={8}
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
  >
    <Box
      backgroundColor="black.50"
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      borderBottom="1px solid"
      borderBottomColor="gray.700"
      height="40px"
    />
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      p={16}
      borderRadius={8}
    >
      <Heading size="lg">{message}</Heading>
      {!!onCreateNew && (
        <Button
          maxWidth="200px"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          mt={4}
          _hover={{ bg: "gray.700" }}
          _active={{
            bg: "gray.800",
            transform: "scale(0.95)",
          }}
          onClick={onCreateNew}
        >
          {createNewLabelBtn || "Add New"}
        </Button>
      )}
    </Stack>
  </Box>
);

export default EmptyState;
