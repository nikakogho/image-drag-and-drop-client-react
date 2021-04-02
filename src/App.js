import './App.css';
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { User } from './User'
import { useDropzone } from 'react-dropzone'

const dataHost = 'lychee-sundae-18964.herokuapp.com' //localhost'
const dataPort = 80 //8080
const dataHttp = 'http'

const dataURL = `${dataHttp}://${dataHost}:${dataPort}`

const fetchUsers = async () => {
  const response = await axios.get(`${dataURL}/profiles`)
  const users = response.data

  // for(const user of users) {
  //   if(user.profileImageLink) {
  //     const fileResponse = await axios.get(`${dataURL}/profiles/${user.id}/download`)
  //     const file = fileResponse.data
  //   }
  // }

  return users
}

const saveFile = async (id, file) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await axios.post(`${dataURL}/profiles/${id}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const data = response.data

  console.log(data)
}

function App() {
  const [users, setUsers] = useState([])

  const saveAndRefresh = async (id, file) => {
    await saveFile(id, file)
    setUsers(await fetchUsers())
  }

  useEffect(() => {
    const setup = async () => setUsers(await fetchUsers())
    setup()
  }, [])

  return (
    <div className="App">
      <ul>
        {users.map(user => <User key={user.id} {...user} url={dataURL} saveFile={saveAndRefresh}/>)}
      </ul>
    </div>
  );
}

export default App;
