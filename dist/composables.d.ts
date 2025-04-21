import { Ref, ShallowRef } from 'vue';
import { WalletAccount, WalletWithRequiredFeatures, SuiSignPersonalMessageInput, SuiSignPersonalMessageOutput, SuiSignTransactionInput, SignedTransaction, SuiSignAndExecuteTransactionInput, SuiSignAndExecuteTransactionOutput, SuiSignAndExecuteTransactionBlockOutput, SuiSignTransactionBlockOutput } from '@mysten/wallet-standard';
import { PartialBy } from './utilityTypes';

type SignPersonalMessageArgs = PartialBy<SuiSignPersonalMessageInput, "account">;
type SignTransactionArgs = PartialBy<SuiSignTransactionInput, "account" | "chain">;
type SignAndExecuteTransactionArgs = PartialBy<SuiSignAndExecuteTransactionInput, "account" | "chain">;
export declare const useConfig: () => {
    autoConnect: Ref<boolean, boolean>;
    preferredWallets: Ref<string[], string[]>;
    requiredFeatures: Ref<`${string}:${string}`[], `${string}:${string}`[]>;
    connectButtonText: {
        connect: string;
        disconnect: string;
    };
    connectDialogText: {
        connectWallet: string;
        noWallet: string;
    };
};
interface PersistState {
    lastConnectedWalletName: string | undefined;
    lastConnectedAccountAddress: string | undefined;
}
export declare const usePersistState: () => import('@vueuse/shared').RemovableRef<PersistState>;
export declare const useWallets: () => {
    wallets: ShallowRef<WalletWithRequiredFeatures[]>;
};
export declare const useConnectWallet: () => {
    connect: (wallet: WalletWithRequiredFeatures) => Promise<void>;
};
export declare const useDisconnectWallet: () => {
    disconnect: () => void;
};
export declare const useAccounts: () => {
    accounts: ShallowRef<readonly WalletAccount[] | undefined>;
};
export declare const useCurrentWallet: () => {
    currentWallet: () => WalletWithRequiredFeatures | undefined;
    currentWalletStatus: Ref<"connecting" | "connected" | "disconnected" | undefined, "connecting" | "connected" | "disconnected" | undefined>;
};
export declare const useCurrentAccount: () => {
    currentAccount: ShallowRef<WalletAccount | undefined>;
};
export declare const useSignPersonalMessage: () => {
    signPersonalMessage: (args: SignPersonalMessageArgs) => Promise<SuiSignPersonalMessageOutput>;
};
export declare const useSignTransactionBlock: () => {
    signTransactionBlock: (args: SignTransactionArgs) => Promise<SignedTransaction | SuiSignTransactionBlockOutput>;
};
export declare const useSignAndExecuteTransactionBlock: () => {
    signAndExecuteTransaction: (args: SignAndExecuteTransactionArgs) => Promise<SuiSignAndExecuteTransactionOutput | SuiSignAndExecuteTransactionBlockOutput>;
};
export {};
