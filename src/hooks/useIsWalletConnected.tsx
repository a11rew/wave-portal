import { useEffect, useState } from "react";

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
        console.log("You should install Metamask!");
      } else console.log("We have the ethereum object!", ethereum);

      // Check for wallet authorization
      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: any) => {
          if (accounts.length > 0) {
            const account = accounts[0] as any;
            console.log(`Found an authorized account ${account}`);
            setCurrentAccount(account);
            setIsLoading(false);
          } else {
            console.log("No authorized account found");
            setIsLoading(false);
          }
        })
        .catch((err) => console.log("Wallet not authorized", err));
    } catch (error) {
      console.error(error);
      setError(error as string);
    }
  }, []);

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

  return { currentAccount, error, connectWallet, isLoading };
};

export default useIsWalletConnected;
