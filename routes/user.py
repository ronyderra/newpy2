from fastapi import APIRouter
from models.user import USER
from config.db import conn
from schemas.user import serializeList
import userTrxs
user = APIRouter()

def getHash(n):
    return n["hash"]

@user.get('/trxs/{address}')
async def getUser(address):
    user = serializeList(conn.MakerDao.users.find({"userAddress": address}))
    if user:
        print("no need")
        return user[0]
    trxs = userTrxs(address)
    filtered = [e for e in trxs if e['from'].upper() == address.upper()]
    userTrxsField = []
    duprray = []
    for item in filtered:
        destAddress = item["to"]
        if destAddress in duprray:
            print("included allready")
            continue
        duprray.append(destAddress)
        destAddressTrxs = [e for e in filtered if e['to'] == destAddress]
        hashes = list(map(getHash, destAddressTrxs))
        userTrxsField.append({"destAddress": destAddress, "hashes": hashes})
    conn.MakerDao.users.insert_one({
        "userAddress": address,
        "trxs": userTrxsField[0:10]
    })
    return {
        "userAddress": address,
        "trxs": userTrxsField[0:10]
    }
