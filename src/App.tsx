import axios from 'axios'
import React, { useState } from 'react'
import './App.css'

interface File {
  lastModified: number
  name: string
  size: number
  type: string
}

function App() {
  const [images, setImages] = useState([])
  const [videoPath, setVideoPath] = useState<string | null>()

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const saveImgs: any = [...images, (target.files as FileList)[0]]
    setImages(saveImgs)
  }
  const handleConvert = () => {
    const formData = new FormData()
    images.forEach((file: File, i: number) => {
      formData.append('images' + i, file as any)
    })
    axios.post('/api/images', formData).then((response) => setVideoPath(response.data.path))
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <h1>Import Images</h1>
        <input type='file' name='images' id='images' accept='.jpg, .png, .jpge' onChange={handleChange} />
        <button onClick={handleConvert} style={{ marginTop: '10px' }}>
          Convert
        </button>
        <h4>Images Selected</h4>
        <div>
          {images?.map((file: File, i: number) => (
            <a key={i}>
              {file?.name}
              <br />
            </a>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <h1>Video Result</h1>
        {videoPath && (
          <video controls width='100%'>
            <source src={`${axios.defaults.baseURL}${videoPath.slice(1)}`} type='video/mp4' />
          </video>
        )}
      </div>
    </div>
  )
}

export default App
