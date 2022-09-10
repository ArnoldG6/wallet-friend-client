import {CookiesProvider} from "react-cookie";
import WalletFriend from "./pages/WalletFriend";
import {useState} from "react";
import {ColorScheme, ColorSchemeProvider} from "@mantine/core";
import {useHotkeys} from "@mantine/hooks";

export default function App() {
  return (


      <CookiesProvider>
          <WalletFriend/>
      </CookiesProvider>

  );
}