const url = 'http://localhost:8000'

const AppService = {
  getInbox: async (id) => {
    const res = await fetch(`${url}/api/v1/text/inbox/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const data = await res.json()
    return data
  },
  sendText: async (textData) => {
    const res = await fetch(`${url}/api/v1/text`, {
      method: 'POST',
      body: JSON.stringify(textData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    return data
  },
}

export default AppService
