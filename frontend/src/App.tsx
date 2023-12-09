import { useEffect, useState } from "react";
import {
  Box,
  ChakraProvider,
  Drawer,
  DrawerContent,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { HomePage } from "./pages/Home";
import theme from "./theme";
import "@fontsource/poppins";
import { Helmet } from "react-helmet";
import useAuthStore from "./store/useAuth";
import LoginPage from "./pages/Login";
import { socket } from "./utils/socket";
import useMemoryStore from "./store/useMemory";
import SidebarContent from "./components/Sidebar";
import { IconType } from "react-icons";
import { FiFileText, FiSettings } from "react-icons/fi";
import MobileNav from "./components/MobileNav";
import { SettingPage } from "./pages/Settings";

interface MenuItemsProps {
  name: string;
  icon: IconType;
  component: () => JSX.Element;
}

const menus: Array<MenuItemsProps> = [
  { name: "Home", icon: FiFileText, component: HomePage },
  { name: "Settings", icon: FiSettings, component: SettingPage },
];

function App() {
  const [init, user, loading] = useAuthStore((store) => [
    store.init,
    store.user,
    store.loading,
  ]);
  const [initMemory] = useMemoryStore((store) => [store.init]);
  useEffect(() => {
    socket.init(`${import.meta.env.VITE_API_HOST || ""}`);
    init();
    setTimeout(() => {
      initMemory();
    }, 2000);
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const Page = menus[activeMenuIndex].component;

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Box
        display={"flex"}
        justifyContent={"center"}
        color={"#1D1D1D"}
        backgroundColor={"#25262B"}
      >
        <Box w={"100%"} h={"100vh"} position="relative">
          {loading && (
            <Box
              w={"100%"}
              h={"100vh"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner />
            </Box>
          )}
          {!loading && (
            <>
              {!user && <LoginPage />}
              {user && (
                <Box>
                  <SidebarContent
                    onClose={() => onClose}
                    display={{ base: "none", md: "block" }}
                    menus={menus}
                    active={activeMenuIndex}
                    setActive={setActiveMenuIndex}
                  />
                  <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                  >
                    <DrawerContent>
                      <SidebarContent
                        onClose={onClose}
                        menus={menus}
                        active={activeMenuIndex}
                        setActive={setActiveMenuIndex}
                      />
                    </DrawerContent>
                  </Drawer>
                  <MobileNav onOpen={onOpen} />
                  <Box ml={{ base: 0, md: 60 }} color={"gray.200"}>
                    <Page />
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
