import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { WavePortal } from "../types/WavePortal";
import { contractABI, contractAddress } from "../utils/contractData";

interface Wave {
  address: string;
  timestamp: Date;
  message: string;
}

const useWaves = () => {
  const [allWaves, setAllWaves] = useState<Wave[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const { ethereum } = window;

  useEffect(() => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        ) as WavePortal;

        // Call the getAllWaves method from contract
        wavePortalContract.getAllWaves().then((waves) => {
          setAllWaves(
            waves.map((wave) => ({
              address: wave.waver,
              timestamp: new Date(wave.timestamp.toNumber() * 1000),
              message: wave.message,
            }))
          );
          setIsLoading(false);
        });
      } else {
        console.log("Ethereum object does not exist");
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [ethereum]);

  const wave = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // Execute contract wave method
        const waveTxn = await wavePortalContract.wave("Test wave");
        console.log("Mining... ", waveTxn.hash);
        await waveTxn.wait();

        console.log("Mined -- ", waveTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { waves: allWaves, wave, isLoading };
};

export default useWaves;
