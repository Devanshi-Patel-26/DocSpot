import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useState, useEffect } from 'react';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const [token, setToken] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleTouchStart = (event) => {
        const target = event.target.closest('.hover-effect');
        if (target) {
            target.classList.add('touch-active');
        }
    };

    const handleTouchEnd = (event) => {
        const target = event.target.closest('.hover-effect');
        if (target) {
            setTimeout(() => {
                target.classList.remove('touch-active');
            }, 300);
        }
    };

    // Attach event listeners to document
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
        // Cleanup event listeners when component unmounts
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
    };
}, []);

useEffect(() => {
    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown-container') && !event.target.closest('.profile-container')) {
            setShowDropdown(false);
        }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt=""></img>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/' className='hover-effect' >
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> {/*here hidden class will set the display:none*/}
            </NavLink>
            <NavLink to='/doctors' className='hover-effect' >
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about' className='hover-effect' >
                <li className='py-1'> ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact' className='hover-effect' >
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token 
                ? <div className='profile-container flex items-center gap-2 cursor-pointer group relative hover-effect ' onClick={() => setShowDropdown(!showDropdown)}>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt=""></img>
                    <img className='w-2.5' src={assets.dropdown_icon} alt=""></img>
                    <div className={`dropdown-container absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${showDropdown ? 'block' : 'hidden'} md:group-hover:block`}>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                            <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> 
                : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
            }
            <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt=""/>
            {/*-----------Mobile Menu----------*/}
            <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`} >
                <div className='flex items-center justify-between px-5 py-6' >
                    <img className='w-36' src={assets.logo} alt=""/>
                    <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt=""/>
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium' >
                    <NavLink  onClick={() => setShowMenu(false)} to='/' className='hover-effect' ><p className='px-4 py-2 rounded inline-block' >HOME</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/doctors' className='hover-effect' ><p className='px-4 py-2 rounded inline-block' >ALL DOCTORS</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/about' className='hover-effect' ><p className='px-4 py-2 rounded inline-block' >ABOUT</p></NavLink>
                    <NavLink  onClick={() => setShowMenu(false)} to='/contact' className='hover-effect' ><p className='px-4 py-2 rounded inline-block' >CONTACT</p></NavLink> 
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar