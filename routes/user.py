from fastapi import APIRouter
from models.user import USER
from config.db import conn
from schemas.user import serializeList
from bson import ObjectId
import userTrxs
user = APIRouter()

def getHash(n):
    return n["hash"]

@user.get('/trx/{address}')
async def getUser(address):
    user = serializeList(conn.MakerDao.users.find({"userAddress": address}))
    if user:
        print("no need")
        return user[0]
    trxs = userTrxs(address)
    filtered = [e for e in trxs if e['from'] == address]
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
        "trxs": userTrxsField[:10]
    })
    return {
        "userAddress": address,
        "trxs": userTrxsField[:10]
    }


@user.get('/user/{address}')
async def findUser(address):
    user = serializeList(conn.MakerDao.users.find({"userAddress": address}))
    return user[0]
