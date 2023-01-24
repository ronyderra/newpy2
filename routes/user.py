from fastapi import APIRouter
from models.user import Transaction
from config.db import conn
from schemas.user import serializeDict, serializeList
from bson import ObjectId
user = APIRouter()

@user.get('/')
async def getTransactions():
    return serializeList(conn.MakerDao.transactions.find())


@user.post('/')
async def saveTransactions(transaction: Transaction):
    conn.MakerDao.transactions.insert_one(dict(user))
    return serializeList(conn.local.user.find())
