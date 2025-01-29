const getAuthorized = (url, token) => fetch(url, {
    method: "GET",
    headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    }
}).then(res => res.json().then(data => data))

export default getAuthorized()
