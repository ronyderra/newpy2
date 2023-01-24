from fastapi import APIRouter
from models.user import User 
from config.db import conn 
from schemas.user import serializeDict, serializeList
from bson import ObjectId
user = APIRouter() 

@user.get('/')
async def find_all_users():
    return serializeList(conn.local.user.find())

# @user.get('/{id}')
# async def find_one_user(id):
#     return serializeDict(conn.local.user.find_one({"_id":ObjectId(id)}))





