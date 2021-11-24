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

  useEffect(() => {
    try {
      const { ethereum } = window;

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
          waves.forEach((wave) => {
            setAllWaves([
              ...allWaves,
              {
                address: wave.waver,
                timestamp: new Date(wave.timestamp.toNumber() * 1000),
                message: wave.message,
              },
            ]);
          });
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
  }, []);

  return { waves: allWaves, isLoading };
};

export default useWaves;
