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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#001d3d',
        color: 'white',
        minWidth: '50px',
        borderRadius: '10px',
      }}
    >
      <label style={{ padding: '5px 5px 5px 15px' }}>{props.file?.file.name}</label>
      <button
        onClick={() => props.handleDelete(props.file.id)}
        style={{
          display: 'flex',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          width: '10px',
          fontSize: '0.5rem',
          textAlign: 'center',
          justifyContent: 'center',
          margin: '5px',
        }}
      >
        X
      </button>
    </div>
  )
}

export default ImageSelected
