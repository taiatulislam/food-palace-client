import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from 'sweetalert2'

const AddFood = () => {

    const { user } = useContext(AuthContext);

    const handleAdd = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const origin = form.origin.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const image = form.image.value;
        const details = form.details.value;
        const madeBy = form.madeBy.value;

        const addFood = { name, category, origin, price, quantity, image, details, madeBy }

        fetch('http://localhost:5000/addFood/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addFood)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Food Added Successfully',
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
                    <h2 className="text-5xl pb-5 font-bold text-center mt-3 text-[#FA8072]">Add Food Page</h2>
                    <div className="flex items-center">
                        <div className="w-1/2">
                            <form className='px-10' onSubmit={handleAdd}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Name</span>
                                    </label>
                                    <input type="text" name="name" className="input" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Category</span>
                                    </label>
                                    <input type="text" name="category" className="input" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Origin</span>
                                    </label>
                                    <input type="text" name="origin" className="input" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Price</span>
                                    </label>
                                    <input type="number" name="price" className="input" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Quantity</span>
                                    </label>
                                    <input type="number" name="quantity" className="input" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Photo URL</span>
                                    </label>
                                    <input type="text" name="image" className="input" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Add By</span>
                                    </label>
                                    <input type="text" name="madeBy" defaultValue={user?.email} className="input" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Description</span>
                                    </label>
                                    <textarea name="details" rows="4" className="rounded-lg p-2" required />
                                </div>
                                <div className="form-control mt-5">
                                    <button type='submit' className="btn bg-[#FA8072] border-none text-white text-md font-medium normal-case">Add Food</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AddFood;