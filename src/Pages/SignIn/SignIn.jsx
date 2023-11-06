import { useContext, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Providers/AuthProvider";

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                navigate(location.state ? location.state : '/')
                Swal.fire({
                    title: 'Success!',
                    text: 'SignIn successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            .catch(error => {
                console.log(error.code, error.message);
                return Swal.fire({
                    title: 'Error!',
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
    }

    const handleGoogle = e => {
        e.preventDefault();
        googleSignIn()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'User SignIn successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                navigate(location.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error.code, error.message);
                Swal.fire({
                    title: 'Error!',
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
    }

    return (
        <div className='pt-5 rounded-b-lg' style={{ backgroundImage: 'url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <div className='flex flex-col'>
                <div className="w-1/2">
                    <h2 className="text-5xl font-bold text-center my-5 text-[#FA8072]">Sign In</h2>
                    <form className='px-10' onSubmit={handleForm}>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-md text-white">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Your email" className="input" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-md text-white">Password</span>
                            </label>
                            <div className='flex items-center'>
                                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Your password" className="input relative w-full" required />
                                <span onClick={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                    {
                                        showPassword ? <BsEyeSlashFill className='absolute -mt-2 -ml-8'></BsEyeSlashFill> : <BsEyeFill className='absolute -mt-2 -ml-8'></BsEyeFill>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#FA8072] border-none text-md text-white font-medium normal-case">Sign In</button>
                        </div>
                    </form>
                    <div className="form-control mt-6 px-10">
                        <button onClick={handleGoogle} className="btn bg-base-400 text-md font-medium normal-case"><FcGoogle className="text-2xl"></FcGoogle>Google Sign In</button>
                    </div>
                    <p className='px-10 mt-4 mb-5 text-white'>New to the site? <Link to="/signUp" className="text-[#FA8072]">Sign Up</Link></p>
                </div>
            </div >
        </div >
    );
};

export default SignIn;