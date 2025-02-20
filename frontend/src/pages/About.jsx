import { useState } from 'react'
import { assets } from '../assets/assets'


const About = () => {

  const [activeCard, setActiveCard] = useState(null);

  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to DocSpot, your trusted platform for hassle-free doctor appointment booking. We connect patients with top healthcare professionals, making medical consultations seamless and accessible</p>
          <p>At DocSpot, we prioritize your health by simplifying the process of finding and booking doctors. Our platform offers a wide network of experienced healthcare professionals across various specialties, ensuring you get the right care when you need it. With secure appointments, real-time availability, and patient reviews, we make informed healthcare choices easier</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At DocSpot, our vision is to revolutionize healthcare access by making doctor appointments seamless and hassle-free. We strive to bridge the gap between patients and healthcare providers through technology, ensuring quality care for everyone.</p>
        </div>
      </div>
      
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US?</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        {[
          { title: "Efficiency:", text: "Streamlined appointment scheduling that fits into your busy lifestyle." },
          { title: "Convenience:", text: "Access to a network of trusted healthcare professionals in your area." },
          { title: "Personalization:", text: "Tailored recommendations and reminders to help you stay on top of your health." }
        ].map((item, index) => (
          <div
            key={index}
            onTouchStart={() => setActiveCard(index)}
            onTouchEnd={() => setTimeout(() => setActiveCard(null), 300)}
            className={`border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] transition-all duration-300 text-gray-600 cursor-pointer
              ${activeCard === index ? "bg-[#5f6FFF] text-white" : "hover:bg-[#5f6FFF] hover:text-white"}
            `}
          >
            <b>{item.title}</b>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default About