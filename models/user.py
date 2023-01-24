from pydantic import BaseModel


class Transaction(BaseModel):
    blockNumber: str
    timeStamp: str
    hash: str
    nonce: str
    blockHash: str
    transactionIndex: str
    fromm: str
    to: str
    value: str
    gas: str
    gasPrice: str
    isError: str
    txreceipt_status: str
    input: str
    contractAddress: str
    cumulativeGasUsed: str
    gasUsed: str
    confirmations: str
    methodId: str
    functionName: str
