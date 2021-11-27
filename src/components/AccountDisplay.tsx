import { useState } from "react";

import useAccountBalance from "../hooks/useAccountBalance";
import useIsWalletConnected from "../hooks/useIsWalletConnected";
import AccountModal from "./AccountModal";
import { truncate } from "./MessageList";
import EthSprite from "../assets/ethsprite";

const AccountDisplay = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { currentAccount } = useIsWalletConnected();
  const { accountBalance } = useAccountBalance(currentAccount);

  if (!accountBalance && !currentAccount) return null;
  return (
    <div className="flex pl-3 pr-xss h-12 items-center rounded-xl bg-highlight m-auto text-lg py-2">
      <p>{accountBalance.substr(0, 5)} ETH</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl bg-primary ml-3 p-2 transition-all ease-in-out duration-200 ring-1 ring-transparent hover:ring-green-400 hover:bg-opacity-40"
      >
        {truncate(currentAccount)}
        <div className="rounded-full w-4 h-4 overflow-hidden">
          <EthSprite />
        </div>
      </button>
      <AccountModal
        isOpen={isOpen}
        account={currentAccount}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default AccountDisplay;
