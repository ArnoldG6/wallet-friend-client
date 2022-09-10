import {CookiesProvider} from "react-cookie";
import WalletFriend from "./Pages/WalletFriend";

export default function App() {
  return (
      <CookiesProvider>
          <WalletFriend/>
      </CookiesProvider>
  );
}