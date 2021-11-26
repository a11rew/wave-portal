import { useEffect, useState } from "react";
import { ethers } from "ethers";

interface Return {
  balanceLoading: boolean;
  accountBalance: string;
}
const useAccountBalance = (account: string): Return => {
  const [loading, setLoading] = useState(true);
  const [accountBalance, setAccountBalance] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        // Connect onClick and place account in state
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(ethereum as any);
        if (account) {
          const balance = await provider.getBalance(account, "latest");
          const ethBalance = ethers.utils.formatEther(balance);
          setAccountBalance(ethBalance);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [account]);

  return { balanceLoading: loading, accountBalance };
};

export default useAccountBalance;
