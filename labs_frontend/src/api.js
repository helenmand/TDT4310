export async function post(url, body) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data;
      })
      .catch((err) => console.log(err));
}
