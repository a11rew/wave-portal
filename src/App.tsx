import { useState } from "react";
import MessageList from "./components/MessageList";
import AccountDisplay from "./components/AccountDisplay";

import useIsWalletConnected from "./hooks/useIsWalletConnected";
import useWaves from "./hooks/useWaves";
import { Toaster } from "react-hot-toast";
import Loader from "react-loader-spinner";

/** TODO
 * Handle errors(Cooldown, failed auth etc)
 * Testing
 * Show message when no metamask
 */

function App() {
  const { currentAccount, connectWallet, isLoading } = useIsWalletConnected();
  const [message, setMessage] = useState("");
  const { wave, waveLoading } = useWaves();

  /** Track error state */
  const errorState = message.length >= 140;

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center w-full mt-16 gap-10 p-4">
        <div className="flex flex-col justify-center max-w-lg">
          <div className="mb-8 flex justify-center">
            {currentAccount && <AccountDisplay />}
          </div>
          <div className="text-center text-4xl">👋 Hey there!</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              wave(message);
            }}
            className="flex flex-col"
          >
            <label htmlFor="messageInput" className="text-center my-4">
              Andrew here, send{" "}
              <a href="https://a11rew.dev" className="underline text-heading">
                me
              </a>{" "}
              a message over the three webs
            </label>
            <textarea
              id="messageInput"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Roadhouse!"
              className="bg-transparent border border-opacity-30 rounded-md p-2"
            />
            <div className="flex text-sm mt-2 justify-between">
              <p className="pr-8"></p>
              <div>
                <p
                  className={`${
                    message.length >= 120 &&
                    message.length < 140 &&
                    "text-yellow-300"
                  }
            ${message.length >= 140 && "text-red-400"}
            `}
                >
                  {message.length}/140
                </p>
              </div>
            </div>
            {currentAccount && (
              <button
                disabled={waveLoading || errorState}
                className={`mt-4 p-2 flex justify-center rounded-md text-black bg-gray-300 transition-all duration-150 ease-in-out ${
                  (waveLoading || errorState) && "opacity-40 cursor-not-allowed"
                }`}
                type="submit"
              >
                {waveLoading ? (
                  <Loader
                    type="TailSpin"
                    color="#296073"
                    width="24"
                    height="24"
                  />
                ) : (
                  "Wave at Me"
                )}
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
        {currentAccount && (
          <div className="max-w-xl">
            <MessageList />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
