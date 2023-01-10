import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import uuid from 'react-uuid'
import ReactPlayer from 'react-player'
import ImageSelected from '../ImageSelected/ImageSelected'
import { sendImages } from '../../shared/apiFunctions/queryMutations'
import { getVideo } from '../../shared/apiFunctions/queryFunctions'

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
  const [video, setVideo] = useState<any | null>()
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [successVideo, SetSuccessVideo] = useState(false)
  const [errorVideo, setErrorVideo] = useState(false)
  const [data, setData] = useState<any | null>()

  const createVideo = useMutation({
    mutationFn: sendImages,
    onMutate: () => {
      setData(null)
      setVideo(null)
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
    if (data && successVideo) {
      const path = `${axios.defaults.baseURL}${data.path.slice(1)}`
      console.log(path, typeof path)
      setVideo(path)
      // getVideo(path).then((video) => setVideo(video))
    }
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
          video &&
          ReactPlayer.canPlay(video) && (
            <video controls width='100%'>
              <source src={video} type='video/mp4' />
            </video>
            // <ReactPlayer url={video} controls />
          )
        )}
      </div>
    </div>
  )
}

export default Home
