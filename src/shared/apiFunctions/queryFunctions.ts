import axios from 'axios'

export const getVideo = async (path: string) => {
  const video = await axios.get(path)
  return video.data
}
