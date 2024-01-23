import {useParams } from "react-router-dom"

const Resume = () => {
    const params = useParams()


  return (
    <div>
        <h1>Name : {params.name}</h1>
    </div>
  )
}

export default Resume