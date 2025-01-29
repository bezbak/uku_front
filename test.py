from requests import request
test = request('get', 'http://localhost:3000/detail/1533')
print(test.text)