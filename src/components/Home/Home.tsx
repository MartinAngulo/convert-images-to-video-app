import React, { useState } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'
import ImageSelected from '../ImageSelected/ImageSelected'

interface File {
  id: string
  file: {
    lastModified: number
    name: string
    size: number
    type: string
  }
}

const Home = () => {
  const [images, setImages] = useState([])
  const [videoPath, setVideoPath] = useState<string | null>()

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const saveImgs: any = [...images, { id: uuid(), file: (target.files as FileList)[0] }]
    setImages((target.files as FileList)[0] ? saveImgs : images)
  }
  const handleConvert = () => {
    const formData = new FormData()
    images.forEach((file: File, i: number) => {
      formData.append('images' + i, file.file as any)
    })
    axios.post('/api/images', formData).then((response) => setVideoPath(response.data.path))
  }
  const handleDelete = (id: string) => {
    const imgsFiltered: any = images.filter((e: File) => e.id !== id)
    setImages(imgsFiltered)
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
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '4' }}>
          {images?.map((file: File, i: number) => (
            <div key={i}>
              <ImageSelected file={file} handleDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <h1>Video Result</h1>
        {videoPath && (
          <video controls width='100%' autoPlay>
            <source src={`${axios.defaults.baseURL}${videoPath.slice(1)}`} type='video/mp4'></source>
          </video>
        )}
      </div>
    </div>
  )
}

export default Home
