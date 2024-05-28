'use client'
import data from '@/public/data/lisTest.json' assert { type: 'json' };
import { AnyARecord } from 'dns';
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import Pie from '@/components/Timer/Timer';
import { Player } from '@lottiefiles/react-lottie-player';
import { TabSlider } from '@/components/Common/TabSlider';
export default function Page({ params }: { params: { id: string } }) {
    const [play, setPlay] = useState(false);
    const oceanRef = useRef<HTMLAudioElement>(null);
    const MAX = 20;
  
    const toggleAudio = () => {
      if (play) {
        oceanRef.current?.pause();
        setPlay(false);
      } else {
        void oceanRef.current?.play();
        setPlay(true);
      }
    }
  
    const handleVolume= (e: React.ChangeEvent<HTMLInputElement>) =>{
      const { value } = e.target;
      const volume = Number(value) / MAX;
      if ( oceanRef.current)
        oceanRef.current.volume = volume;
    }
    const genAns = (obj: { type: String}[]) => {
        const MCElements = [];
        const FBElements = [];
        obj.forEach( (ele, key) =>{
            const element = (
                <div key={key} className="flex gap-2 items-center">
                    <div className="w-8 h-8 bg-red-500 flex justify-center items-center text-white rounded-full">
                        {key+1}
                    </div>
                    <div key={key} className="bg-gray-100 h-fit rounded-lg shadow-inner">
                        <input
                            className="w-full bg-transparent h-fit p-1 text-black placeholder-transparent focus:outline-none"
                            type="text"
                        /> 
                    </div>
                </div>
            );
            
              FBElements.push(element);
        });
        return (
              <div className="px-5 grid grid-cols-2 gap-5">
                {FBElements}
              </div>
          );
    }
    return (
        <div className="flex h-fit py-5 px-5 bg-gray-200 flex-col items-center gap-5">
            <div className="lg:h-full py-5 h-fit w-full bg-white flex flex-col rounded-xl shadow-xl">
                <div className="px-5  items-center flex  justify-between h-fit w-full ">
                    <div dangerouslySetInnerHTML={{__html: data.lis1.Part1.requirement}}/>             
                    <div className=" flex items-center  md:scale-100 scale-75">
                        <div className='flex flex-col items-center'>
                            <Player
                                src='/animation/cheer.json'
                                className="player"
                                loop
                                autoplay
                                style={{ height: '100px', width: '100px' }}
                            />
                            <div className='flex'>
                                <button
                                onClick={toggleAudio}
                                type="button"
                                className=" w-10 rounded-full p-2 text-white shadow-sm"
                                >
                                    {!play ? (
                                        <FaPlay className="h-5 w-5 text-black" aria-hidden="true" />
                                    ) : (
                                        <FaPause className="h-5 w-5 text-black" aria-hidden="true" />
                                    )}
                                </button>         
                                <input
                                    type="range"
                                    className="mr-2 w-full accent-cyan-700"
                                    min={0}
                                    max={MAX}
                                    onChange={(e) => handleVolume(e)}
                                />
                                <audio ref={oceanRef} loop src={data.lis1.linkaudio}/>
                            </div>
                        </div>
                        <Pie duration={10}/> 
                    </div>
                </div>
                <div 
                    id="description" 
                    className=" md:px-5 mt-10 w-full justify-between
                    flex h-2/3  md:flex-row flex-col gap-5 jutify-center"> 

                    <div className="w-full lg:w-1/2  bg-gray-100 py-5 px-5" dangerouslySetInnerHTML={{__html: data.lis1.Part1.description}}/>
                    <div className="w-full lg:w-1/2">
                        {genAns(data.lis1.Part1.question)}
                    </div>
                </div>
            </div>
            <div 
                id="description" 
                className="w-full bg-white shadow-xl 
                overflow-y-hidden flex jutify-center">               
               
            </div>
        
        </div>
        
    );
}