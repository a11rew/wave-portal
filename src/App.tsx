import MessageList from "./components/MessageList";
import useIsWalletConnected from "./hooks/useIsWalletConnected";
import useWaves from "./hooks/useWaves";

function App() {
  const { currentAccount, connectWallet, isLoading } = useIsWalletConnected();
  const { wave } = useWaves();

  return (
    <div className="flex flex-col items-center w-full mt-16 gap-10">
      <div className="flex flex-col justify-center max-w-lg">
        <div className="text-center text-4xl">👋 Hey there!</div>
        <div className="text-center mt-4">
          Send me a message over the three webs
        </div>
        <button
          className="mt-4 p-2 rounded-md text-black bg-gray-300"
          onClick={wave}
        >
          Wave at Me
        </button>
        {!currentAccount && !isLoading && (
          <button
            className="mt-4 p-2 rounded-md bg-gray-300 text-black"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div className="max-w-xl">
        <MessageList />
      </div>
    </div>
  );
}

export default App;
