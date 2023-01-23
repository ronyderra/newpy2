from web3 import Web3, EthereumTesterProvider
print(Web3.toHex(0))
w3 = Web3(EthereumTesterProvider())
print(w3.isConnected())
print(w3.eth.chain_id)
# x = w3.eth.get_transaction_receipt("0x95df96a2d57ae58aa624d2d384264b4ec4e1930a0c3ea0c282e0f771694d54d9")
# print(x)
