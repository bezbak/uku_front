const fetcher = url => fetch(url).then(res => res.json().then(data => data))

export default fetcher