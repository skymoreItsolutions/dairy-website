

import React from 'react'

import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";




export const Topbar = (props) => {


    const topbarData = {
        message: "We provide 100% fresh service to our customers.",
        email: "example@gmail.com",
        phone: "+91 798853 2993",
        socials: [
          { icon: "instagram", link: "https://instagram.com" },
          { icon: "facebook", link: "https://facebook.com" },
          { icon: "twitter", link: "https://twitter.com" },
          { icon: "linkedin", link: "https://linkedin.com" },
        ],
      }


  return(
    <>

<div className="w-full px-20 bg-amber-200 py-2 flex flex-wrap items-center justify-between text-sm md:text-base">

      <div className="text-center font-bold ">
      We provide <span className='text-green-700'>
      100%
        </span> fresh service to our customers.
      </div>


      <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center  text-center">
        <span>Email: <a href={`mailto:${topbarData?.email}`} className="font-semibold">{topbarData?.email}</a></span>
        <span>Phone: <a href={`tel:${topbarData?.phone}`} className="font-semibold">{topbarData?.phone}</a></span>
      </div>


      <div className="flex gap-3 text-lg justify-center">
        {topbarData?.socials?.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            {social.icon === "instagram" && <FaInstagram />}
            {social.icon === "facebook" && <FaFacebook />}
            {social.icon === "twitter" && <FaXTwitter />}
            {social.icon === "linkedin" && <FaLinkedin />}
          </a>
        ))}
      </div>

    </div>
   
    </>
   )
  }
