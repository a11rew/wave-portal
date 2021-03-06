import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { WavePortal } from "../types/WavePortal";
import { contractABI, contractAddress } from "../utils/contractData";
import toast from "react-hot-toast";
import { Logger } from "@ethersproject/logger";

interface Wave {
  address: string;
  timestamp: Date;
  message: string;
}

const useWaves = () => {
  const [allWaves, setAllWaves] = useState<Wave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [waveLoading, setWaveLoading] = useState(false);

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
        wavePortalContract
          .getAllWaves()
          .then((waves) => {
            setAllWaves(
              waves.map((wave) => ({
                address: wave.waver,
                timestamp: new Date(wave.timestamp.toNumber() * 1000),
                message: wave.message,
              }))
            );
            setIsLoading(false);
          })
          .catch((err) => console.error("Error fetching waves", err));
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, [ethereum]);

  const wave = async (message: string) => {
    setWaveLoading(true);
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
        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        await waveTxn.wait();
        toast.success("Nice! Message sent.");
      } else {
        return;
      }
    } catch (error: any) {
      console.error(1, error);
      if (error.code === Logger.errors.CALL_EXCEPTION) {
        toast.error("Sorry, you're rate limited. Try again in 15 seconds");
      } else {
        toast.error("Something went wrong, try again.");
      }
    }
    setWaveLoading(false);
  };

  // Listener for emitter events
  useEffect(() => {
    let wavePortalContract: ethers.Contract;

    const onNewWave = (from: any, timestamp: any, message: string) => {
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, [ethereum]);

  return { waves: allWaves, wave, isLoading, waveLoading };
};

export default useWaves;
