import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const Purchase = () => {

    const { user } = useContext(AuthContext);
    const food = useLoaderData();

    const handlePurchase = e => {
        e.preventDefault();
        const form = e.target;
        food._id = null;
        food.userName = user.displayName;
        food.userEmail = user.email;
        food.date = e.target.date.value;

        fetch('https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/purchase/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(food)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Purchased Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset();
                }
            })
    }

    return (
        <div className='pt-5 rounded-b-lg' style={{ backgroundImage: 'url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
            <div className='flex flex-col'>
                <div className='pb-5'>
                    <h2 className="text-5xl font-bold text-center mt-3 text-[#FA8072]">Order Page</h2>
                    <div className="flex items-center">
                        <div className="w-1/2">
                            <form className='px-10' onSubmit={handlePurchase}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Name</span>
                                    </label>
                                    <input type="text" name="name" defaultValue={food.name} className="input" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Price</span>
                                    </label>
                                    <input type="text" name="price" defaultValue={food.price} className="input" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Quantity</span>
                                    </label>
                                    <input type="text" name="quantity" defaultValue={food.quantity} className="input" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">User Name</span>
                                    </label>
                                    <input type="text" name="userName" defaultValue={user?.displayName} className="input" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">User Email</span>
                                    </label>
                                    <input type="text" name="userEmail" defaultValue={user?.email} className="input" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Purchase Date</span>
                                    </label>
                                    <input type="date" name="date" className="input" />
                                </div>
                                <div className="form-control mt-5">
                                    <button type='submit' className="btn bg-[#FA8072] border-none text-white text-md font-medium normal-case">Purchase</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-1/2">
                            <figure><img src={food.image} alt="food" className="h-[500px] w-[500px] rounded-lg" /></figure>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Purchase;