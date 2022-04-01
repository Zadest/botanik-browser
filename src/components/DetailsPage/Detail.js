import axios from 'axios'
import { ReactChild, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams()
  const [plantData, setPlantData] = useState(null)
  const [plantDataLoading, setPlantDataLoading] = useState(true)
  const [plantDataError, setPlantDataError] = useState(null)

  useEffect(() => {
    console.log(id)
    axios(`http://localhost:8000/rest/plant/${id}/`).then(
      (response) => {
        if (response && response.status === 200) {
          setPlantData(response.data)
          setPlantDataLoading(false)
          console.log(response)
        }
      }
    ).catch((e) => {
      console.error(e)
      setPlantDataLoading(false)
      setPlantDataError(e)
    })
    return () => {
      setPlantData(null)
      setPlantDataLoading(true)
      setPlantDataError(null)
    }
  }, [])

  if (plantDataLoading) {
    return (
      <>Loading...</>
    )
  }

  if (plantDataError) {
    return (
      <>An error occurred...<br />
        <Link to="/home">Back</Link></>
    )
  }

  return (
    <div className='flex flex-col items-center w-full gap-4 my-2 py-4 bg-offwhite'>
      <h1 className='text-xl w-full text-center'>{plantData?.page}</h1>
      <div className='flex flex-row justify-between px-10 w-full gap-2'>
        <img className='rounded-md w-full border-plantgreen border-4' alt={plantData?.page} src={`http://localhost:8000${plantData?.page_image}`} />
        <div className='flex flex-col items-center w-full'>
          {
            plantData?.classifications.map((classi) => {
              return (
                <>
                  <div className='flex flex-row gap-2 h-64 w-full rounded-t-md items-center justify-evenly border-x-4 border-t-4 border-plantgreen'>
                    <img className='h-full text-center w-full' alt={classi?.descr} src={`http://localhost:8000${classi?.real_image}`} />
                    <div className='flex flex-col w-full text-xs'>In:<span className='p-2 text-md font-bold'>{
                      classi?.PublicationID?.name
                    }</span>
                    by:{
                      classi?.PublicationID?.authors.map(
                        (author)=> {
                          return (<span className='p-2 text-md font-bold'>
                            {author.first_name + author.last_name}
                            </span>)
                            })
                    }
                    Year:
                    <span className='p-2 text-md font-bold'>
                    {
                      classi?.PublicationID?.year                            
                    }
                    </span> 
                    </div>
                  </div>
                  <h1 className='text-xl mb-2 rounded-b-md bg-plantgreen border-t-4 border-plantgreen w-full text-center'>
                    {classi?.descr}
                  </h1>
                </>
              )
            }
            )
          }
        </div>
      </div>

    </div>

  )
}

export default Detail