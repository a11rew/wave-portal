import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";

import { truncate } from "./MessageList";
import EthSprite from "../assets/ethsprite";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  account: string;
}

const AccountModal = ({ isOpen, setIsOpen, account }: Props) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 transition-all ease-in-out duration-300"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full bg-primary text-white max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Account
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="focus:outline-none outline-none focus:opacity-40 hover:opacity-40 transition-all ease-in-out duration-150 "
                  >
                    <AiOutlineClose className="text-xl" />
                  </button>
                </div>
                <div className="mt-2">
                  <AccountCard account={account} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AccountModal;

const AccountCard = ({ account }: { account: string }) => {
  return (
    <div className="ring-1 p-5 rounded-2xl">
      <div>
        <div className="flex justify-between text-sm">
          <p className="opacity-60">Connected with Metamask</p>
        </div>
      </div>
      <div className="flex gap-2 my-3 items-center">
        <div className="rounded-full overflow-hidden">
          <EthSprite />
        </div>
        <p className="text-2xl">{truncate(account)}</p>
      </div>
      <div className="flex gap-4 text-sm">
        <button
          className="inline-flex items-center gap-1"
          onClick={() => {
            navigator.clipboard.writeText(account);
            toast.success("Copied address to clipboard");
          }}
        >
          <MdContentCopy className="" />
          Copy Address
        </button>
        <a
          href={`https://rinkeby.etherscan.io/address/${account}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1"
        >
          <RiExternalLinkLine className="text-base" />
          View on Explorer
        </a>
      </div>
    </div>
  );
};
