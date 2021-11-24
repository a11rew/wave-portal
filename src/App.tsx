import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import useIsWalletConnected from "./hooks/useIsWalletConnected";

const contractAddress = "0x55540700996E144C5f7C7D64Ae1dA4b9798F9549";
const contractABI = abi.abi;

function App() {
  const { currentAccount, connectWallet } = useIsWalletConnected();

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
