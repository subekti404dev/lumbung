import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import useAuthStore from "../../store/useAuth";

const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const initialCredentialValue = { password: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredential] = useState(initialCredentialValue);
  const handleShowClick = () => setShowPassword((v) => !v);
  const [login, isLoggingIn] = useAuthStore((store) => [
    store.login,
    store.loggingIn,
  ]);

  const onSubmit = async () => {
    const user = await login(credentials.password);
    if (user) setCredential(initialCredentialValue);
  };

  return (
    <Box
      backgroundColor={"#25262B"}
      minH={"100vh"}
      textAlign="center"
      fontSize="xl"
      color={"#1D1D1D"}
      padding={"0 16px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="#202123"
        boxShadow="md"
        borderRadius={8}
        minW={"250px"}
      >
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<CFaLock color="gray.300" />}
            />
            <Input
              color={"#C1C2C5"}
              borderColor={"#373A40"}
              backgroundColor={"#25262B"}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              isDisabled={isLoggingIn}
              value={credentials.password}
              onChange={(e) =>
                setCredential((c) => ({ ...c, password: e.target.value }))
              }
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          borderRadius={8}
          type="submit"
          variant="solid"
          backgroundColor={"#715D9A"}
          color={"#FFF"}
          width="full"
          isDisabled={isLoggingIn}
          onClick={onSubmit}
        >
          {isLoggingIn ? <Spinner /> : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
