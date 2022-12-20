export async function fetchPredictions(text, url, lab) {
  let method = "POST"
  let body = JSON.stringify({text, lab})
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body,
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data;
      })
      .catch((err) => console.log(err));
}
