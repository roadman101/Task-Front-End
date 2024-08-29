/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import compLogo from "../assets/comp.png"
// import help from "../assets/Property1.png";
import man from "../assets/Property2.png";
import woman from "../assets/Property3.png";

const CoverPage = () => {

  const homeImages = [compLogo, man, woman];

  // State to track the index of the current image being displayed 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to control whether the transition effect is active 
  const [isTransitioning, setIsTransitioning] = useState(false);

  // useEffect Hook to handle the image transition logic.
  useEffect(() => {
    // Set up an interval to change the images every 2.5sec
    const animation = setInterval(() => {
      setIsTransitioning(true);  // (true) Start the transition effect

      // After 2sec, update the current image index and stop the transition effect
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          // Calculate the next image index (loop back to the first image if at the end)
          return (prevIndex + 1) % homeImages.length;
        })

        setIsTransitioning(false); // End the transition effect 
      }, 500);
    }, 2500);

    // Cleanup function of setInterval when the components unmounts. 
    return () => {
      clearInterval(animation);
    };
  }, [homeImages.length]);   // Dependency array to re-run the effect if the lenght of homeImages array changes 

  return (
    <main className='homepage-con'>
        <div className='page-con'>
            <div className='text-start home-text'>
                <h1 className='home-h1 m-0'>Manage your Tasks on <span className=''>TaskDuty</span> </h1>
                <p className='home-p m-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl semper porttitor. Nec accumsan.</p>
                <Link className='home-a' to={"/tasks"} >Go to My Tasks</Link>
            </div>

            <div className='home-img'>
                <img className={`illu ${isTransitioning ? "change" : ""} `} 
               // {/* Applying the "change" className if transitioning is true and removing "change when its false" */}
                src={homeImages[currentImageIndex]} alt="" style={{opacity: isTransitioning ? 0 : 1, transition: "opacity 0.5s ease-in-out"}} />
            </div>
        </div>
    </main>
  )
}

export default CoverPage;