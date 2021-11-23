import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";

const contractAddress = "0x55540700996E144C5f7C7D64Ae1dA4b9798F9549";
const contractABI = abi.abi;

const wave = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      // Execute contract wave method
      const waveTxn = await wavePortalContract.wave();
      console.log("Mining... ", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [currentAccount, setCurrentAccount] = useState();

  const checkIfWalletIsConnected = async () => {
    try {
      // Checks if the 'ethereum' object has been injected into window by Metamask
      const { ethereum } = window;

      if (!ethereum) {
        console.log("You should install Metamask!");
      } else console.log("We have the ethereum object!", ethereum);

      // Check for wallet authorization

      const accounts: any = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        const account = accounts[0] as any;
        console.log(`Found an authorized account ${account}`);

        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      // Connect onClick and place account in state
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask ya bum");
        return;
      }

      const accounts: any = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="flex justify-center w-full mt-16">
      <div className="flex flex-col justify-center max-w-2xl">
        <div className="text-center text-4xl">👋 Hey there!</div>

        <div className="text-center text-gray-500 mt-4">
          I'm Andrew and I'm getting started with Web3
        </div>
        <button className="mt-4 p-2 rounded-md bg-gray-300" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button
            className="mt-4 p-2 rounded-md bg-gray-300"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
