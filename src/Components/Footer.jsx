import { Link } from 'react-router-dom';
import logo from '../assets/images/logo/logo-dark.jpg'
import { BsFacebook, BsTwitter, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const Footer = () => {
    return (
        <div style={{ backgroundImage: 'url(https://i.ibb.co/TkCjv1C/grilled-chicken-breast-served-black-slate.jpg)', backgroundSize: 'cover' }}>
            <footer className="footer footer-center p-10 text-primary-content max-w-7xl mx-auto place-items-end">
                <aside>
                    <img src={logo} alt="" className='w-[150px]' />
                    <p className="text-lg font-semibold">Food Palace <br />Providing food with great taste</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-5">
                        <Link to='https://www.facebook.com/'><BsFacebook className='text-3xl bg-white text-blue-500 rounded-full p-1'></BsFacebook></Link>
                        <Link to='https://www.google.com/'><FcGoogle className='text-3xl bg-white rounded-full p-1'></FcGoogle></Link>
                        <Link to='https://www.linkedin.com/'><BsLinkedin className='text-3xl bg-white text-blue-500 rounded-lg p-1'></BsLinkedin></Link>
                        <Link to='https://www.youtube.com/'><BsYoutube className='text-3xl bg-white text-red-500 rounded-full p-1'></BsYoutube></Link>
                        <Link to='https://twitter.com/'><BsTwitter className='text-3xl bg-white text-blue-500 rounded-full p-1'></BsTwitter></Link>
                    </div>
                </nav>
            </footer>
            <p className='text-white  text-lg text-center py-5'>Copyright © 2023 - All right reserved</p>
        </div>
    );
};

export default Footer;