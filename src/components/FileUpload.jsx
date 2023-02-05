import React, { useState, useReducer } from 'react';
import Axios from 'axios';
import './FileUpload.css';
import { saveAs } from 'file-saver';
import { INITIAL_STATE, reducer } from './Reducer';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

 const FileUpload = () => {
//USEREDUCER
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

//USESTATE
    //const [download, setDownload] = useState(false)
    const [imgBW, setImhBW] = useState('')
    const [color, setColor] = useState(false)

//FUNCTIONS
    const downloadImage = () => {
        saveAs(imgBW, 'bwImg.png')
    }
    const colorPhoto = () => {
        setColor(!color)
    }

    const uploadImage = async (event) => {
        console.log(event.target.files[0])
        let img = event.target.files[0]
        const data = new FormData()
        data.append('file', img)
        data.append('upload_preset', 'tech-challange-img')
        //setLoading(true)

        try{
            dispatch({type:"START"})
            const postImg = await Axios.post('https://api.cloudinary.com/v1_1/dubnrrtje/image/upload', data)
            console.log(postImg)
            dispatch({type:"POSTED", payload:postImg.data.url})
            let imgPNG = postImg.data.public_id
            setImhBW(`https://res.cloudinary.com/dubnrrtje/image/upload/e_grayscale/${imgPNG}.jpg`)
            //setDownload(true)
     
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div className='flex-search'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="22" fill="currentColor" className="bi bi-image-fill" viewBox="0 0 16 16">
                <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
            </svg>
            <input onChange={uploadImage} type='file' name='file' placeholder='Upload Image' />
            </div>
            {state.loading?(<CircularProgress className='loader' color="inherit" />):(<img className={!color ? 'image-style': 'image-style2' } src={state.img} alt='black&whiteImg'/>)}
            <div className='button-flex'>
            {state.download && <Button variant="outlined" className='button' onClick={downloadImage}>Download</Button>}
            {state.download && <Button variant="outlined" className='button' onClick={colorPhoto}>Revert</Button>}
            </div>
        </div>
    )
}

export default FileUpload