import { reactive, ref, Ref } from 'vue'
import {
    getWallets,
    WalletAccount,
    StandardConnect,
    StandardEvents,
    isWalletWithRequiredFeatureSet,
    WalletWithRequiredFeatures,
    SuiSignPersonalMessageInput,
    SuiSignPersonalMessageOutput,
    SuiSignTransactionInput,
    SignedTransaction,
    SuiSignAndExecuteTransactionInput,
    SuiSignAndExecuteTransactionOutput
} from '@mysten/wallet-standard'
import { ZKSEND_WALLET_NAME } from '@mysten/zksend'
import { createGlobalState, useStorage } from '@vueuse/core'
import { PartialBy } from './utilityTypes'


type SignPersonalMessageArgs = PartialBy<SuiSignPersonalMessageInput, 'account'>
type SignTransactionArgs = PartialBy<SuiSignTransactionInput, 'account' | 'chain'>
type SignAndExecuteTransactionArgs = PartialBy<SuiSignAndExecuteTransactionInput, 'account' | 'chain'>

const SUI_WALLET_NAME = 'Sui Wallet'

// API of WalletStandard
const { get } = getWallets()

// global state in memory
interface GlobalState {
    autoConnect: Ref<boolean>;
    preferredWallets: Ref<string[]>;
    requiredFeatures: Ref<(keyof WalletWithRequiredFeatures['features'])[]>;
    connectButtonText: {
        connect: string;
        disconnect: string;
    },
    connectDialogText: {
        connectWallet: string;
        noWallet: string;
    },
    currentWallet: WalletWithRequiredFeatures | undefined;
    currentWalletStatus: Ref<"connecting" | "connected" | "disconnected" | undefined>;
    currentAccount: Ref<WalletAccount | undefined>;
    accounts: Ref<readonly WalletAccount[] | undefined>;
}
const useGlobalState = createGlobalState(() => {
    const state = {
        // config state
        autoConnect: ref(true),
        preferredWallets: ref([SUI_WALLET_NAME, ZKSEND_WALLET_NAME]),
        requiredFeatures: ref<(keyof WalletWithRequiredFeatures['features'])[]>(['sui:signTransactionBlock']),
        connectButtonText: reactive({
            connect: 'Connect',
            disconnect: 'Disconnect'
        }),
        connectDialogText: reactive({
            connectWallet: 'Connect a Wallet',
            noWallet: 'Get Started with Sui',
        }),
        // wallet state
        currentWallet: undefined,
        currentWalletStatus: ref(),
        currentAccount: ref<WalletAccount>(),
        accounts: ref<readonly WalletAccount[]>()
    } as GlobalState
    return state
})
const globalState = useGlobalState()

export const useConfig = () => ({
    autoConnect: globalState.autoConnect,
    preferredWallets: globalState.preferredWallets,
    requiredFeatures: globalState.requiredFeatures,
    connectButtonText: globalState.connectButtonText,
    connectDialogText: globalState.connectDialogText
})

interface PersistState {
    lastConnectedWalletName: string | undefined,
    lastConnectedAccountAddress: string | undefined,
}
export const usePersistState = createGlobalState(() => useStorage('sui-vue-connection-info', {
    lastConnectedWalletName: undefined,
    lastConnectedAccountAddress: undefined,
} as PersistState))
const persistState = usePersistState()

export const useWallets = () => {
    const wallets = get().filter((wallet): wallet is WalletWithRequiredFeatures => isWalletWithRequiredFeatureSet(wallet, globalState.requiredFeatures.value))
    return {
        wallets: [
            ...globalState.preferredWallets.value
                .map(name => wallets.find(wallet => wallet.name === name))
                .filter(Boolean) as WalletWithRequiredFeatures[],
            ...wallets.filter(wallet => !globalState.preferredWallets.value.includes(wallet.name))
        ]
    }
}

export const useConnectWallet = () => {
    const connect = async (wallet: WalletWithRequiredFeatures) => {
        try {
            globalState.currentWallet = wallet
            globalState.currentWalletStatus.value = 'connecting'
            const connectOutput = await wallet.features[StandardConnect].connect()
            globalState.accounts.value = connectOutput.accounts

            persistState.value.lastConnectedWalletName = wallet.name
            if (persistState.value.lastConnectedAccountAddress) {
                globalState.currentAccount.value = connectOutput.accounts.find(a => a.address === persistState.value.lastConnectedAccountAddress) ?? connectOutput.accounts[0]
            } else {
                globalState.currentAccount.value = connectOutput.accounts[0]
            }
            persistState.value.lastConnectedAccountAddress = globalState.currentAccount.value.address

            const off = wallet.features[StandardEvents].on('change', ({ accounts }) => {
                globalState.accounts.value = accounts
                if (accounts === undefined || accounts.length == 0) {
                    globalState.currentWalletStatus.value = 'disconnected'
                    globalState.currentWallet = undefined
                    globalState.currentAccount.value = undefined
                    persistState.value.lastConnectedWalletName = undefined
                    persistState.value.lastConnectedAccountAddress = undefined
                    off()
                } else {
                    globalState.currentAccount.value = accounts[0]
                    persistState.value.lastConnectedAccountAddress = globalState.currentAccount.value.address
                }
            })
            globalState.currentWalletStatus.value = 'connected'
        } catch (err) {
            globalState.currentWalletStatus.value = 'disconnected'
            globalState.currentWallet = undefined
            // console.error('Failed to connect the application to the selected wallet.', err)
        }
    }

    return { connect }
}

export const useDisconnectWallet = () => {
    const disconnect = () => {
        try {
            globalState.currentWallet?.features['standard:disconnect']?.disconnect()
        } catch (err) {
            // console.error('Failed to disconnect the application from the current wallet.', err)
        }
        globalState.currentWalletStatus.value = 'disconnected'
        globalState.currentWallet = undefined
        globalState.currentAccount.value = undefined
        globalState.accounts.value = undefined
        persistState.value.lastConnectedWalletName = undefined
        persistState.value.lastConnectedAccountAddress = undefined
    }

    return { disconnect }
}

export const useAccounts = () => ({ accounts: globalState.accounts })

export const useCurrentWallet = () => ({ currentWallet: () => globalState.currentWallet, currentWalletStatus: globalState.currentWalletStatus })

export const useCurrentAccount = () => ({ currentAccount: globalState.currentAccount })

export const useSignPersonalMessage = () => {

    const signPersonalMessage: (args: SignPersonalMessageArgs) => Promise<SuiSignPersonalMessageOutput> =
        ({ message, account }) => {
            if (!globalState.currentWallet) {
                throw new Error('No wallet is connected.')
            }

            const signerAccount = account ?? globalState.currentAccount.value
            if (!signerAccount) {
                throw new Error('No wallet account is selected to sign the personal message with.')
            }

            const feature = globalState.currentWallet.features['sui:signPersonalMessage']
            if (!feature) {
                throw new Error("This wallet doesn't support the `signPersonalMessage` feature.")
            }

            return feature.signPersonalMessage({ message, account: signerAccount })
        }

    return { signPersonalMessage }
}

export const useSignTransactionBlock = () => {

    const signTransactionBlock: (args: SignTransactionArgs) => Promise<SignedTransaction> =
        ({ transaction, account, chain }) => {
            if (!globalState.currentWallet) {
                throw new Error('No wallet is connected.')
            }

            const signerAccount = account ?? globalState.currentAccount.value
            if (!signerAccount) {
                throw new Error('No wallet account is selected to sign the personal message with.')
            }

            const feature = globalState.currentWallet.features['sui:signTransaction']
            if (!feature) {
                throw new Error("This wallet doesn't support the `SignTransactionBlock` feature.")
            }

            return feature.signTransaction({
                transaction,
                account: signerAccount,
                chain: chain ?? signerAccount.chains[0]
            })
        }

    return { signTransactionBlock }
}

export const useSignAndExecuteTransactionBlock = () => {

    const signAndExecuteTransaction: (args: SignAndExecuteTransactionArgs) => Promise<SuiSignAndExecuteTransactionOutput> =
        ({ transaction, account, chain }) => {
            if (!globalState.currentWallet) {
                throw new Error('No wallet is connected.')
            }

            const signerAccount = account ?? globalState.currentAccount.value
            if (!signerAccount) {
                throw new Error('No wallet account is selected to sign the personal message with.')
            }

            const feature = globalState.currentWallet.features['sui:signAndExecuteTransaction']
            if (!feature) {
                throw new Error("This wallet doesn't support the `signAndExecuteTransactionBlock` feature.")
            }

            return feature.signAndExecuteTransaction({
                transaction,
                account: signerAccount,
                chain: chain ?? signerAccount.chains[0],
            })
        }

    return { signAndExecuteTransaction }
}