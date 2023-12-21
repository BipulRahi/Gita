"use client"
import { AppContext } from '@/app/context/context';
import { Texttoopenai } from '@/utils/Texttoopenai';
import React, { FormEvent, useContext, useState } from 'react'

export const TextToSpeech = () => {
    const[userText,setuserText]=useState("");
    const[loading,setloading]=useState(false);

    const {isplay,setisplay}=useContext(AppContext);


    const synth= typeof window !== "undefined" ? window.speechSynthesis : null;
    const voices=synth?.getVoices();
    console.log(voices);

    const selectvoice=voices?.find((voice)=>voice.name==="Google हिन्दी");

    const speak=(TextToSpeech: string)=>{
        const utterance=new SpeechSynthesisUtterance(TextToSpeech);
        utterance.voice=selectvoice!;
        utterance.rate=0.8;
        utterance.pitch=0.8;
        synth?.speak(utterance);
        utterance.onstart=()=>(setisplay(true))
      
        utterance.onend=()=>{
     
          setisplay(false);
          setloading(false);
          setuserText("");
        }

      };


    const handleUserText = async(e:FormEvent<HTMLFormElement>) => { e.preventDefault();
      setloading(true);
      
      try {
       let message=await Texttoopenai(userText);
        console.log(message); 
        speak(message);
      } catch (error) {
        let message='';
        if(error instanceof Error) message=error.message
        console.log(message);
        speak(userText);
      }finally{
        setloading(false);

     
      }
     }


  return (
    <div className='relative top-0 z-50'>
        
        <form onSubmit={handleUserText} className='space-x-2 pt-3 absolute left-[30%] top-[1em]'>
            <input value={userText} onChange={e=>setuserText(e.target.value)} type="text" placeholder='pucho manush kya prashan h tumhare'  className='bg-transparent text-white p-2 outline-none rounded-lg placeholder:text-white/50 w-[500px] border border-[#b00c3f]/80'/>
            <button disabled={loading} className=' hover:scale-110 rounded-[70%] hover:text-slate-800 hover:bg-[#b00c3f]/80 duration-200 transition-all p-2 border text-white border-[#b00c3f]/70 disabled:text-gray-100 disabled:cursor-not-allowed disabled:bg-slate-600'>
              {
                loading ? "Thinking...." : "Ask"
              }
            </button>
        </form>
    </div>
  )
}
