import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from 'sweetalert2'

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        const user = { name, email, photo, password };

        if (password.length < 6) {
            return Swal.fire({
                title: 'Error!',
                text: 'Password length must be grater than 6',
                icon: 'error',
                confirmButtonText: 'OK'
            })

        }
        else if (!/[A-Z]/.test(password)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Password should have one capital letter',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        else if (!/[@$!%*?&]/.test(password)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Password should have one special character',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                result.user.displayName = name;
                result.user.photoURL = photo;
                Swal.fire({
                    title: 'Success!',
                    text: 'Create User successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                fetch('http://localhost:5000/users/', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => data)
                navigate('/')
            })
            .catch(error => {
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
                <div className='w-1/2 pb-5'>
                    <h2 className="text-5xl font-bold text-center mt-3 text-[#FA8072]">Sign Up</h2>
                    <form className='px-10' onSubmit={handleForm}>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-md text-white">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your name" className="input" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-md text-white">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Your email" className="input" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-md text-white">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Your photo URL" className="input" required />
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
                        <div className="form-control my-5 flex-row gap-2">
                            <input type="checkbox" name="terms" required />
                            <span className="text-md font-semibold text-white">Accept all terms and conditions.</span>
                        </div>
                        <div className="form-control">
                            <button type='submit' className="btn bg-[#FA8072] border-none text-white text-md font-medium normal-case">Register</button>
                        </div>
                    </form>
                    <p className='px-10 mt-4 text-white pb-10'>Already have an account? <Link to="/signIn" className="text-[#FA8072]">Sign In</Link></p>
                </div>
            </div >
        </div >
    );
};

export default SignUp;