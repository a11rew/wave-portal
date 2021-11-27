import { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";

interface Return {
  currentAccount: any;
  error: string | null;
  connectWallet: () => void;
  isLoading: boolean;
}

const useIsWalletConnected = (): Return => {
  const [currentAccount, setCurrentAccount] = useState();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Checks if the 'ethereum' object has been injected into window by Metamask
      const { ethereum } = window;

      if (!ethereum) {
        setIsLoading(false);
      } else {
        // Check for wallet authorization
        ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: any) => {
            if (accounts.length > 0) {
              const account = accounts[0] as any;
              setCurrentAccount(account);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          })
          .catch((err) => console.log("Wallet not authorized", err));
      }
    } catch (error) {
      console.error(error);
      setError(error as string);
      setIsLoading(false);
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Connect onClick and place account in state
      const { ethereum } = window;

      if (!ethereum) {
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding();
        return;
      }

      const accounts: any = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return { currentAccount, error, connectWallet, isLoading };
};

export default useIsWalletConnected;
