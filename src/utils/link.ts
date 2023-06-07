import Web3 from 'web3';

type ethAuth = {
    provider: any,
}
const provider: ethAuth = {
    provider: "",
}

import { abi } from './NFTABI'
import { rewardAbi } from './getrewardABI'
const abiAddress = "0x904812b9727709f0eFc431a84c7fb22B5f5c09c4"
const rewardAbiAddress = '0x41eEe609340085F59aC0BA0f6e6C3E26049b5661'
const ReviewerNFT= "0xEECa91976A097f79d9dF61B831f6e9fc3B614C04"
const AuditorNFT = "0x752e934db5dB81402B900DED0515cAD7A1DD6be3"
const ResearcherNFT = "0x5F6bed6913535465Cb6c738B21943fE75A577cD6"
const ProducerNFT = "0x76AB56D45E19207fF5a3682df27BaB5c299cf92d"

export default {
    ...provider,
    // 链接
    connect: function () {
        if (window.ethereum) {
            return new Promise(async (resolve, reject) => {
                this.provider = new Web3(window.ethereum)
                window.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
                    this.SwitchEthereumChainParameter();
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        } else {
            window.open('https://metamask.io/download/')
            return false;
        }
    },

    // 监听连接与网络变化
    change: function () {
        return new Promise(async (reslove, reject) => {
            window.ethereum.on('accountsChanged', (accounts: any) => {
                if(accounts.length == 0){
                    reslove(true)
                }else{
                    reject(false)
                }
            });        
        })
    },

    //添加/切换网络
    SwitchEthereumChainParameter: async function () {
        let id = Web3.utils.toHex(56)
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: id }]
            });
        } catch (error: any) {
            if (error.code == 4902) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: id,
                            chainName: 'Binance Smart Chain Mainnet',
                            rpcUrls: ['https://bsc-dataseed.binance.org'],
                            nativeCurrency: {
                                name: 'BNB',
                                symbol: 'BNB',
                                decimals: 18,
                            }
                        }
                    ]
                })
            }
        }
    },

    isReviewerNFT:async function (){
        let provider = new Web3(window.ethereum);
        let accounts = await provider.eth.getAccounts()
        let newContract = new provider.eth.Contract( abi , ReviewerNFT);
        return new Promise((reslove,reject) => {
            newContract.methods.balanceOf(accounts[0]).call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },

    isAuditorNFT:async function (){
        let provider = new Web3(window.ethereum);
        let accounts = await provider.eth.getAccounts()
        let newContract = new provider.eth.Contract( abi , AuditorNFT);
        return new Promise((reslove,reject) => {
            newContract.methods.balanceOf(accounts[0]).call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },

    isResearcherNFT:async function (){
        let provider = new Web3(window.ethereum);
        let accounts = await provider.eth.getAccounts()
        let newContract = new provider.eth.Contract( abi , ResearcherNFT);
        return new Promise((reslove,reject) => {
            newContract.methods.balanceOf(accounts[0]).call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },

    isProducerNFT:async function (){
        let provider = new Web3(window.ethereum);
        let accounts = await provider.eth.getAccounts()
        let newContract = new provider.eth.Contract( abi , ProducerNFT);
        return new Promise((reslove,reject) => {
            newContract.methods.balanceOf(accounts[0]).call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },
    
    getlowRatio: async () => {
        let provider = new Web3(window.ethereum);
        let newContract = new provider.eth.Contract( rewardAbi , rewardAbiAddress);
        return new Promise((reslove,reject) => {
            newContract.methods.lowrewardcardinality().call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },

    getHighRatio: async () => {
        let provider = new Web3(window.ethereum);
        let newContract = new provider.eth.Contract( rewardAbi , rewardAbiAddress);
        return new Promise((reslove,reject) => {
            newContract.methods.highrewardcardinality().call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },

    collectGlod: async function (){
        let provider = new Web3(window.ethereum);
        let accounts = await provider.eth.getAccounts()
        let newContract = new provider.eth.Contract( rewardAbi , rewardAbiAddress);
        return new Promise((reslove,reject) => {
            newContract.methods.getuserforreward(accounts[0]).call().then( (res:any) => {
                reslove(res)
            }).catch ((err: any) => {
                reject(err)
            })
        })
    },

    lastLuckyTime: async function (){
        let provider = new Web3(window.ethereum);
        let accounts = await provider.eth.getAccounts()
        let newContract = new provider.eth.Contract( rewardAbi , rewardAbiAddress);
        newContract.methods.claimuserforreward(accounts[0]).call().then( res => {

        })
    },

    getSign(message = 'Welcome to DeCheck! Click to sign in and accept the DeCheck Terms of Service: https://decheck.io This request will not trigger a blockchain transaction or cost any gas fees.') {
        return new Promise(async (reslove, reject) => {
            // let accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            let accounts = await this.provider.eth.getAccounts()
            // this.provider.request({ method: 'personal_sign', params: [accounts[0], message] }).then ((res: any) => {
            this.provider.eth.personal.sign(message, accounts[0], (err: any, res: unknown) => {
                reslove({ signMessage: res, account: accounts[0] })
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}