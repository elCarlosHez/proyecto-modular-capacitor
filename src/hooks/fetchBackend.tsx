export const fetchBackend = async (url: string, body: any) => {
  try {
    const promise = await fetch(`${process.env.SERVER_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const response = await promise.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
