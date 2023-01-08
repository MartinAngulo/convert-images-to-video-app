import axios from 'axios'

interface File {
  id: string
  file: {
    lastModified: number
    name: string
    size: number
    type: string
  }
}

export const sendImages = async (images: Array<File>) => {
  const formData = new FormData()
  images.forEach((file: File, i: number) => {
    formData.append('images' + i, file.file as any)
  })
  const { data } = await axios.post('/api/images', formData)
  return data
}
