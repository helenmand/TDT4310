export async function fetchPredictions(data, url, labNumber) {
  let method = "POST"
  let body = JSON.stringify({data: data, lab: labNumber})
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
