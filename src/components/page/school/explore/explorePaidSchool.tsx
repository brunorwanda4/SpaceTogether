"use client";

import { MyImage } from '@/components/style/myImage'
import { Locale } from '@/i18n'
import Link from 'next/link'
import Slider from "react-slick"
import {useRef} from "react"
import { ISchool } from '@/types/school';
import { ExploreJoinSchoolDialog } from './exploreJoinSchoolDialog';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface props {
    lang : Locale
    schools : ISchool[] | null
}

export const ExplorePaidSchool = ({
    lang , schools
} : props) => {
    const sliderRef = useRef<Slider | null>(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable default arrows
        autoplay: true, // Enable autoplay
        autoplaySpeed: 9000,
        pauseOnHover: true,
    };

    const nextImage = () => {
        if(sliderRef.current) {
          sliderRef.current.slickNext();
        }
    };

    const previousImage = () => {
        if(sliderRef.current) {
          sliderRef.current.slickPrev()
        };
    };
    
    if (!!schools) {
        return (
            <Slider ref={sliderRef} {...settings} className=" mx-4">
                {schools.map((schools) => {
                    return (
                        <main key={schools.id} className=' h-80 card w-full bg-base-200 p-2 relative shadow-lg'>
                            {/* change to next image */}
                            <div className=' absolute top-[45%] justify-between w-full items-center flex'>
                                <button className='btn btn-circle btn-ghost z-40' onClick={previousImage}><BsChevronLeft size={20} className=' '/></button>
                                <button className='btn btn-circle btn-ghost z-40' onClick={nextImage}><BsChevronRight size={20} className=' '/></button>
                            </div>
                            <div className=' flex gap-2 h-full '>
                                <div className=' flex flex-col w-full'>
                                    {/* school title */}
                                <div className=' flex justify-between w-full'>
                                        <div className=' flex gap-1 items-center'>
                                            {/* logo */}
                                            <MyImage href={`/${lang}/s/e/${schools._id}`} className=' size-11' classname=' object-contain' src={schools.logo || "/logo.png"}/>
                                            <div>
                                                <h3 className=' font-semibold  leading-3'>{schools.name}</h3>
                                                <Link href={`/${lang}/s/e/${schools._id}`} className=' text-xs'><span className=' text-info'>@</span>{schools.username}</Link>
                                            </div>
                                        </div>
                                        <div className=' flex gap-2'>
                                            <ExploreJoinSchoolDialog 
                                              schoolId={schools._id}
                                              schoolUsername={schools.username}
                                            />
                                            <Link className=' btn btn-warning btn-sm shadow-lg' href={`/${lang}/s/e/${schools._id}/request`}>Ask Join school</Link>
                                        </div>
                                </div>
                                {/* description */}
                                <p className=' leading-5 line-clamp-3 mt-1 font-normal'>{schools.description}</p>
                                {/* location */}
                                <div className=' mt-2 flex gap-2'>
                                    <h4 className='  capitalize font-semibold '>location : </h4>
                                    <div className=' flex gap-1'>
                                        <span>{schools.country}</span>
                                        <span>-</span>
                                        <span>{schools.province}</span>
                                        <span>-</span>
                                        <span>{schools.city}</span>
                                    </div>
                                </div>
                                {/* levels */}
                                <div className=' mt-2 flex gap-2 '>
                                        <h4 className='  capitalize font-semibold '>Levels :</h4>
                                        {schools.type.map((types) => {
                                            return (
                                                <span key={types} className='badge badge-outline'>{types}</span>
                                            )
                                        })}
                                </div>
                                <div className=' mt-2 flex gap-2  flex-col'>
                                    <h4 className='  capitalize font-semibold '>contacts :</h4>
                                    <div className=' flex flex-col gap-2'>
                                        <div className=' flex gap-2'>
                                            <span className=' text-gray-500 font-medium '>Phone number :</span>
                                            <span>{schools.phoneNumber}</span>
                                        </div>
                                        <div className=' flex gap-2'>
                                            <span className=' text-gray-500 font-medium '>email:</span>
                                            <span className=' cursor-pointer' >{schools.email}</span>
                                        </div>
                                    <div className=' flex justify-between'>
                                            <div className=' flex gap-2'>
                                                <span className=' text-gray-500 font-medium '>Website:</span>
                                                <Link href={schools.websiteURL}  target="_blank" rel="noopener noreferrer" className=' link link-hover'>{schools.websiteURL}</Link>
                                            </div>
                                            <Link className=" link link-hover link-info" href={`/${lang}/s/e/${schools._id}`}>Read more</Link>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className=' flex flex-row flex-1 justify-end gap-2 '>
                                    <MyImage className='w-80 h-full shadow-lg' src='/images/3.jpg'/>
                                    <div className=' flex flex-col gap-2'>
                                        <MyImage className=' w-36 h-1/2 shadow-lg' src='/images/1.jpg'/>
                                        <MyImage className=' w-36 h-1/2 shadow-lg' src='/images/2.jpg'/>
                                    </div>
                                </div>
                            </div>
                        </main>
                    )
                })}
            </Slider>

        )
    }

    return null;

}
