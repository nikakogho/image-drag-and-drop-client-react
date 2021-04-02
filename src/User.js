import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const imageDelay = 7000

const Dropzone = ({ setFile }) => {
  const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0]
      setFile(file)
      console.log(file)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='drop' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p >Drop the image here ...</p> :
          <p>Drag 'n' drop profile image or click to select it</p>
      }
    </div>
  )
}

export const User = ({ id, username, profileImageLink, url, saveFile }) => {
    const [file, setFile] = useState(null)
    const [profileUrl, setProfileUrl] = useState(profileImageLink ? `${url}/profiles/${id}/download?refreshed=0` : '')
    const [refreshed, setRefreshed] = useState(0)

    const saveAndClean = () => {
        saveFile(id, file)
        setFile(null)
        setRefreshed(old => old + 2)
        setTimeout(() => setProfileUrl(profileImageLink ? `${url}/profiles/${id}/download?refreshed=${refreshed+1}` : ''), imageDelay)
    }

    return <>
        <Dropzone setFile={setFile}/>
        <h2>{username}</h2>
        <img src={profileUrl} alt="profile"/>
        {file && <p>{file.name}</p>}
        {file && <button onClick={saveAndClean}>Save File</button>}
    </>
}