import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube';
import {API_KEY,imageUrl} from '../../Constants/constants'
import './Banner.css'
import axios from '../../axios'
function Banner() {

    const [movie,setMovie] = useState({})
    const [bannerIndex,setindex] = useState('')
    const[urlid,setUrlId]=useState('')
    useEffect(()=>{

        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
        .then((response)=>{
            const index=Math.floor(Math.random()*response.data.results.length)
             setindex(index)
            setMovie(response.data.results[index])
            // console.log(response.data.results[1]);
        })
    },[])

    const  handleMovie=(id)=>{
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
           if(response.data.results.length !==0){
               setUrlId(response.data.results[0])  
           }else{
              console.log('array is empty'); 
           }
   
        })
       }

       const opts={
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:1,
        }
    }
       const CloseYoutube =()=>{
           setUrlId(null)
       }
  return (
    <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path :''})`}} className='banner'>
         <div className='bannerVideo'>
       { urlid && <Youtube opts={opts} videoId={urlid.key}/>}
         <div className='closeButton'>
           { urlid && <button className='buttons'  onClick={CloseYoutube} >Close</button>}
           </div>
         </div>
       <div className='content'>

        


        <h1 className='title'>{movie ? movie.title : ''}</h1>
        <div className='banner_buttons'>
            <button className='button' onClick={()=>handleMovie(bannerIndex)} >Play</button>
            <button className='button'>My list</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
        </div> 
      
        <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner