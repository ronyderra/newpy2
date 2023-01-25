import requests
import sys

def userTrxs(address):
    api_url = "https://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=G21V6SUX1MX9HFBG7ZIBJAMXQ2F58ZBSER"
    response = requests.get(api_url)
    jsoned = response.json()
    return jsoned["result"]

sys.modules[__name__] = userTrxs
