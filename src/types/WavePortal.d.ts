/* Typechain artifact*/
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface WavePortalInterface extends ethers.utils.Interface {
  functions: {
    "getAllWaves()": FunctionFragment;
    "getTotalWaves()": FunctionFragment;
    "wave(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getAllWaves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalWaves",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "wave", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getAllWaves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalWaves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wave", data: BytesLike): Result;

  events: {
    "NewWave(address,uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewWave"): EventFragment;
}

export type NewWaveEvent = TypedEvent<
  [string, BigNumber, string] & {
    from: string;
    timestamp: BigNumber;
    message: string;
  }
>;

export class WavePortal extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: WavePortalInterface;

  functions: {
    getAllWaves(overrides?: CallOverrides): Promise<
      [
        ([string, string, BigNumber] & {
          waver: string;
          message: string;
          timestamp: BigNumber;
        })[]
      ]
    >;

    getTotalWaves(overrides?: CallOverrides): Promise<[BigNumber]>;

    wave(
      _message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getAllWaves(overrides?: CallOverrides): Promise<
    ([string, string, BigNumber] & {
      waver: string;
      message: string;
      timestamp: BigNumber;
    })[]
  >;

  getTotalWaves(overrides?: CallOverrides): Promise<BigNumber>;

  wave(
    _message: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAllWaves(overrides?: CallOverrides): Promise<
      ([string, string, BigNumber] & {
        waver: string;
        message: string;
        timestamp: BigNumber;
      })[]
    >;

    getTotalWaves(overrides?: CallOverrides): Promise<BigNumber>;

    wave(_message: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "NewWave(address,uint256,string)"(
      from?: string | null,
      timestamp?: null,
      message?: null
    ): TypedEventFilter<
      [string, BigNumber, string],
      { from: string; timestamp: BigNumber; message: string }
    >;

    NewWave(
      from?: string | null,
      timestamp?: null,
      message?: null
    ): TypedEventFilter<
      [string, BigNumber, string],
      { from: string; timestamp: BigNumber; message: string }
    >;
  };

  estimateGas: {
    getAllWaves(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalWaves(overrides?: CallOverrides): Promise<BigNumber>;

    wave(
      _message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAllWaves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalWaves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wave(
      _message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
