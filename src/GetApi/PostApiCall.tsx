async function PostApiCall(url: string = "", data = {}) {

  const token = localStorage.getItem('token')

  console.log('api call token', token);
  
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
  return result.json();
}

export default PostApiCall