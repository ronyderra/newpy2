import requests

def userTrxs():
    api_url = "https://api.etherscan.io/api?module=account&action=txlist&address=0xfb626333099a91ab677bcd5e9c71bc4dbe0238a8&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=G21V6SUX1MX9HFBG7ZIBJAMXQ2F58ZBSER"
    response = requests.get(api_url)
    jsoned = response.json()
    return jsoned["result"]
