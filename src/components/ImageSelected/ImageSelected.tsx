interface File {
  id: string
  file: {
    lastModified: number
    name: string
    size: number
    type: string
  }
}

const ImageSelected = (props: { file: File; handleDelete: (state: string) => void }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'gray', color: 'white', minWidth: '50px' }}>
      <label>{props.file?.file.name}</label>
      <button onClick={() => props.handleDelete(props.file.id)}>X</button>
    </div>
  )
}

export default ImageSelected
