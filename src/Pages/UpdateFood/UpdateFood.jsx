import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'

const UpdateFood = () => {

    const food = useLoaderData();

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const category = form.category.value;
        const origin = form.origin.value;
        const price = form.price.value;
        const details = form.details.value;
        const quantity = form.quantity.value;

        const updateFood = { name, image, category, origin, price, details, quantity };

        console.log(updateFood);

        fetch(`https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/updateFood/${food._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateFood)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Food Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    return (
        <div className='pt-5 rounded-b-lg' style={{ backgroundImage: 'url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
            <div className='flex flex-col'>
                <div className='pb-5'>
                    <h2 className="text-5xl pb-5 font-bold text-center mt-3 text-[#FA8072]">Update Page</h2>
                    <div className="flex items-center">
                        <div className="w-1/2">
                            <form className='px-10' onSubmit={handleUpdate}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Name</span>
                                    </label>
                                    <input type="text" name="name" defaultValue={food.name} className="input" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Category</span>
                                    </label>
                                    <input type="text" name="category" defaultValue={food.category} className="input" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Food Origin</span>
                                    </label>
                                    <input type="text" name="origin" defaultValue={food.origin} className="input" />
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
                                        <span className="text-md text-white">Photo URL</span>
                                    </label>
                                    <input type="text" name="image" defaultValue={food.image} className="input" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-md text-white">Description</span>
                                    </label>
                                    <textarea name="details" defaultValue={food.details} rows="4" className="rounded-lg p-2" />
                                </div>
                                <div className="form-control mt-5">
                                    <button type='submit' className="btn bg-[#FA8072] border-none text-white text-md font-medium normal-case">Update</button>
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

export default UpdateFood;