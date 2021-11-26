import useAccountBalance from "../hooks/useAccountBalance";
import useIsWalletConnected from "../hooks/useIsWalletConnected";
import { truncate } from "./MessageList";

const AccountDisplay = () => {
  const { currentAccount } = useIsWalletConnected();
  const { accountBalance } = useAccountBalance(currentAccount);

  if (!accountBalance && !currentAccount) return null;
  return (
    <div className="flex pl-3 pr-xss h-12 items-center rounded-xl bg-highlight m-auto text-lg py-2">
      <p>{accountBalance.substr(0, 5)} ETH</p>
      <button className="flex items-center gap-2 rounded-xl bg-primary ml-3 p-2 transition-all ease-in-out duration-200 ring-1 ring-transparent hover:ring-green-400 hover:bg-opacity-40">
        {truncate(currentAccount)}
        <div className="rounded-full w-4 h-4 overflow-hidden">
          <svg x="0" y="0" width="16" height="16">
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              transform="translate(-2.5913661878929855 -2.1949660535024065) rotate(303.1 8 8)"
              fill="#C8143E"
            ></rect>
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              transform="translate(7.895985916180873 3.8024615221117877) rotate(115.3 8 8)"
              fill="#2356E1"
            ></rect>
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              transform="translate(-6.8881691602691175 12.042899842046666) rotate(154.0 8 8)"
              fill="#F5D800"
            ></rect>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default AccountDisplay;
