from pydantic import BaseModel
class USER(BaseModel):
    userAddress:str
    trxs:list
