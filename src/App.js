import { useState , useEffect } from "react";

import {Routes, Route, Link, Navigate} from 'react-router-dom'

import axios from "axios";
import Header from "./components/Header";
import Overview from "./components/OverviewPage/Overview";
import Detail from "./components/DetailsPage/Detail";

const notFound = () => {
  return (<div>404</div>)
}

const App = () => {

  /**
   *  Jeder Datensatz eines Endpoints erhält einen eigenen useState
   *  und wird durch einen eigenen useEffekt onMount vom Server geladen.
   *  Solange die Daten noch nicht vollständig geladen sind, ist ein eindeutig
   *  zu zu ordnender Ladezustand true.
   *  Wenn die Daten empfangen sind oder ein Fehler auftaucht, wird Loading auf false gesetzt.
   *  Ein entsprechender Fehler befindet sich im Error State
   **/
  const [classificationData, setClassificationData] = useState(null)
  const [publicationData, setPublicationData]= useState(null)
  const [plantData, setPlantData]= useState(null)

  const [publicationID, setPublicationID] = useState(0)
  const [plantList,setPlantList] = useState(null)

  const [classificationLoading, setClassificationLoading] = useState(true)
  const [classificationError, setClassificationError] = useState(null)

  const [publicationLoading, setPublicationLoading] = useState(true)
  const [publicationError, setPublicationError] = useState(null)

  const [plantLoading, setPlantLoading] = useState(true)
  const [plantError, setPlantError] = useState(null)


  useEffect(()=>{
    axios('http://localhost:8000/rest/classifications').then(
      (response)=> {
        if(response && response.status === 200){
          setClassificationData(response.data)
          setClassificationLoading(false)
          console.log(response)
        }
      }
    ).catch((e)=>{
      console.error(e)
      setClassificationError(e)
    })
    return () => {
      setClassificationData(null)
    }
  },[])

  useEffect(()=>{
    axios('http://localhost:8000/rest/publications').then(
      (response)=> {
        if(response && response.status === 200){
          setPublicationData(response.data)
          console.log(response)
        }
      }
    ).catch((e)=>{console.error(e)})
    return () => {
      setPublicationData(null)
    }
  },[])

  useEffect(()=>{
    axios('http://localhost:8000/rest/plants').then(
      (response)=> {
        if(response && response.status === 200){
          setPlantData(response.data)
          console.log(response)
        }
      }
    ).catch((e)=>{console.error(e)})
    return () => {
      setPlantData(null)
    }
  },[])


  useEffect(() => {
    console.log(publicationID);
    setPlantList(
      plantData?.map((plant) => {
        if (publicationID === 0) {
          return <Link className="cursor-pointer" to={'/plant/'+plant.id}><img className="h-64 w-44 shrink-0 rounded-xl text-center" alt={plant.page} src={plant.svg} /></Link>;
        } else {
          for (let classi of plant.classifications) {
            if (classi.PublicationID.id === publicationID) {
              return <Link className="cursor-pointer" to={'/plant/'+plant.id}><img className="h-64" alt={plant.page} src={plant.svg} /></Link>;
            }
          }
        }
        return null;
      })
    );
    return () => {
      setPlantList(null);
    };
  }, [publicationID, plantData]);

  return (
    <div className="bg-offwhite flex flex-col px-2">
        <Header />
        
        <Routes>
                <Route path="/plant/:id" element={<Detail/>}/>
                <Route exact path="/doc" element={<>Dok</>}/>
                <Route exact path="/about" element={<>About</>}/>
                <Route exact path="/home" element={<Overview plantList={plantList} publicationData={publicationData} setPublicationID={setPublicationID} />}/>
                <Route path="/*" element={<Navigate replace to="/home"/>}/>
                
            </Routes>
    </div>
  );
}

export default App;
