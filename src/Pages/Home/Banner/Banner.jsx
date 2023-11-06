import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="absolute top-0  w-full">
            <div className="hero h-[90vh]" style={{ backgroundImage: 'url(https://i.ibb.co/F7dG1sH/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface.jpg)', backgroundSize: 'cover', backgroundPosition: 'top center' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-3xl mt-20">
                        <h1 className="mb-5 text-5xl font-serif font-bold">Welcome to</h1>
                        <h1 className="mb-5 text-7xl font-serif font-bold">Food Palace</h1>
                        <p className="text-xl mb-5">Discover culinary artistry at its finest at Food palace. Our passion for exceptional flavors, warm hospitality, and an inviting ambiance come together to create unforgettable dining experiences. Join us to savor each bite, celebrate special moments, and make memories that linger long after your last plate is cleared.</p>
                        <Link to='/allFood' className="btn normal-case text-[#FA8072]">See all food</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;