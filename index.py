from web3 import Web3
import codecs

print("Strating Script")
my_provider = Web3.HTTPProvider('https://polygon-rpc.com')
w3 = Web3(my_provider)
# print(w3.eth.get_block('latest'))
receipt = w3.eth.get_transaction_receipt(
    "0xfed967fb2040275bbdcf9b0df0ced470018ef3f2506752be46a6d5b55cce5425")
print(receipt.blockHash.hex())
print(receipt.blockNumber)
print(receipt.contractAddress)
print(receipt)
# for i in receipt.logs[1].topics:
# 	print(i.hex()) 

