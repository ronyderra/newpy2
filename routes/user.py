from fastapi import APIRouter
from models.user import Transaction
from config.db import conn
from schemas.user import serializeDict, serializeList
from bson import ObjectId
import userTrxs
user = APIRouter()

@user.get('/')
async def getTransactions():
    return serializeList(conn.MakerDao.transactions.find())

@user.post('/trxs')
async def getUser():
    trxs = userTrxs()
    conn.MakerDao.transactions.insert_many(trxs)
