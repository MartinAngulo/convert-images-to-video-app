import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import uuid from 'react-uuid'
import ImageSelected from '../ImageSelected/ImageSelected'
import { sendImages } from '../../shared/apiFunctions/queryMutations'

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
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [successVideo, SetSuccessVideo] = useState(false)
  const [errorVideo, setErrorVideo] = useState(false)
  const [data, setData] = useState<any | null>()

  const createVideo = useMutation({
    mutationFn: sendImages,
    onMutate: () => {
      setData(null)
      setVideoPath(null)
      SetSuccessVideo(false)
      setErrorVideo(false)
      setLoadingVideo(true)
    },
    onSuccess: (response) => {
      setLoadingVideo(false)
      setErrorVideo(false)
      setData(response)
      SetSuccessVideo(true)
    },
    onError: (error) => {
      setLoadingVideo(false)
      SetSuccessVideo(false)
      setData(error)
      setErrorVideo(true)
    },
  })

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const saveImgs: any = [...images, { id: uuid(), file: (target.files as FileList)[0] }]
    setImages((target.files as FileList)[0] ? saveImgs : images)
  }
  const handleConvert = () => {
    createVideo.mutateAsync(images)
  }
  const handleDelete = (id: string) => {
    const imgsFiltered: any = images.filter((e: File) => e.id !== id)
    setImages(imgsFiltered)
  }
  useEffect(() => {
    if (data && successVideo) setVideoPath(data.path)
  }, [data])

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <h1>Import Images</h1>
        <input type='file' name='images' id='images' accept='.jpg, .png, .jpge' onChange={handleChange} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleConvert}
            disabled={!images.length}
            style={{ marginTop: '10px', background: '#001d3d', color: 'white' }}
          >
            CONVERT
          </button>
          <button onClick={() => setImages([])} style={{ marginTop: '10px', background: '#001d3d', color: 'white' }}>
            RESET IMAGES
          </button>
        </div>
        <h4 style={{ padding: '0px', margin: '0', marginTop: '20px' }}>Images Selected</h4>
        <hr style={{ width: '80%', color: 'black', margin: '20px' }} />
        <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {images?.map((file: File, i: number) => (
            <div key={i}>
              <ImageSelected file={file} handleDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
        <h1>Video Result</h1>
        {loadingVideo ? (
          <p>Loading ...</p>
        ) : errorVideo ? (
          <p>An Error ocurrer: {data.message}</p>
        ) : (
          successVideo &&
          videoPath && (
            <video controls width='100%' autoPlay>
              <source src={`${axios.defaults.baseURL}${videoPath.slice(1)}`} type='video/mp4'></source>
            </video>
          )
        )}
      </div>
    </div>
  )
}

export default Home
