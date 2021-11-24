import { useState } from "react";
import MessageList from "./components/MessageList";
import useIsWalletConnected from "./hooks/useIsWalletConnected";
import useWaves from "./hooks/useWaves";

/** TODO
 * Limit input to 140 chars
 * Handle form validation
 * Display wallet info
 * Handle errors(Cooldown, failed auth etc)
 * Loading on submit
 * Update list after submit
 * Real time updates
 * Testing
 */

function App() {
  const { currentAccount, connectWallet, isLoading } = useIsWalletConnected();
  const [message, setMessage] = useState<string>("");
  const { wave } = useWaves();

  return (
    <div className="flex flex-col items-center w-full mt-16 gap-10">
      <div className="flex flex-col justify-center max-w-lg">
        <div className="text-center text-4xl">👋 Hey there!</div>
        <div className="text-center my-4">
          Send{" "}
          <a href="https://a11rew.dev" className="underline text-heading">
            me
          </a>{" "}
          a message over the three webs
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            wave(message);
          }}
          className="flex flex-col"
        >
          <textarea
            required
            placeholder="Roadhouse"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent border border-opacity-30 rounded-md p-2"
          />
          {currentAccount && (
            <button
              className="mt-4 p-2 rounded-md text-black bg-gray-300"
              type="submit"
            >
              Wave at Me
            </button>
          )}
        </form>
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
