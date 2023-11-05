import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='h-[100vh]' style={{ backgroundImage: 'url(https://i.ibb.co/N2DtRkf/404-page-copy.png)' }}>
            <div className='text-center pt-[80vh] space-y-5'>
                <p className='text-white text-4xl'>Oops !!! Page Not Found</p>
                <Link to='/' className='btn normal-case text-white bg-[#FA8072] border-none'>Home Page</Link>
            </div>
        </div>
    );
};

export default ErrorPage;