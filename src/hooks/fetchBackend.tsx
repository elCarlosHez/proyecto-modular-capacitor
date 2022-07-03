export const fetchBackend = async (url: string, body: any, method = "POST") => {
  let token = localStorage.getItem('token');
  try {
    const promise = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
      method,
      body: (method === 'GET') ?  null : JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const response = await promise.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
