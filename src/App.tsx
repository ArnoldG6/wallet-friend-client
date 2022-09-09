import {CookiesProvider} from "react-cookie";
import WalletFriend from "./pages/WalletFriend";

export default function App() {
  return (
      <CookiesProvider>
          <WalletFriend/>
      </CookiesProvider>
  );
}