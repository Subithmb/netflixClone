import React,{useState,useEffect} from 'react'

import Youtube from 'react-youtube';
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../Constants/constants'
import './RowPost.css'
function RowPost(props) {

    const[movies,setMovies]=useState([])
    const[urlid,setUrlId]=useState('')
    // const[youtube,setYoutube]=useState(true)
 

    useEffect(()=>{

        axios.get(props.url).then((response)=>{
          setMovies(response.data.results) 
          console.log(response.data.results[0] );
        }).catch(err=>{
            // alert('Network Error')
        })
    },[props.url])

    const opts={
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:1,
        }
    }
    const  handleMovie=(id)=>{
     axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
        if(response.data.results.length !==0){
            setUrlId(response.data.results[0])  
        }else{
           console.log('array is empty'); 
        }

     })
    }
    const CloseYoutube =()=>{
        setUrlId(null)
    }
   
  return (
    <div className='row'>
       <h2 >{props.title}</h2> 
       <div className='posters'> 

        {movies.map((obj)=><img onClick={()=>handleMovie(obj.id)} className={props.isSmall ?'smallPoster' : 'poster'} alt='poster' src={`${imageUrl+obj?.backdrop_path}`} /> )}
               
       </div>
    <div className='closeButton'>
     { urlid && <button className='buttons'  onClick={CloseYoutube} >Close</button>}
    </div>


      { urlid && <Youtube opts={opts} videoId={urlid.key}/>}

    </div>

  )
}

export default RowPost






