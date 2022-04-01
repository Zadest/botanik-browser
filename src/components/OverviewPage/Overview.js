import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

const Overview = ({plantList,publicationData,setPublicationID}) => {

    const [filter, setFilter] = useState("pub")
    const [filterComponent] = useState(null)
    

    return (
        <>  
            <div className="flex flex-wrap py-5 px-5 justify-between shadow-sm" style={
                {
                    "borderBottomLeftRadius": "5pt",
                    "borderBottomRightRadius": "5pt",
                    "height": "fit-content",
                    "minHeight": "50px",
                }
            }>
                <label className=" flex flex-wrap gap-4"> Publication:
                    <select defaultValue={0} onChange={(e) => setPublicationID(parseInt(e.target.selectedOptions[0].value))}>
                        <option value={0}>
                            All
                        </option>
                        {
                            publicationData?.map(
                                (pub) => {
                                    return <option value={pub.id}>{pub.name}</option>
                                })
                        }
                    </select>
                </label>
            </div>
            <div className="flex flex-wrap gap-4">
                {plantList}
            </div>
        </>
    )
}

export default Overview