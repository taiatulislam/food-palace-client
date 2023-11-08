import { useLoaderData, useNavigate } from "react-router-dom";

const AddedFood = () => {

    const navigate = useNavigate();
    const foods = useLoaderData();

    const handleUpdate = id => {
        navigate(`/updateFood/${id}`)
    }

    return (
        <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
            {
                foods.map(food => <div key={food._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure><img src={food.image} alt="food" className="h-[300px] w-full rounded-b-lg" /></figure>
                    <div className="card-body">
                        <h2 className="text-2xl font-semibold">{food.name}</h2>
                        <p className="text-base font-medium"><span className="font-bold">Category:</span> {food.category}</p>
                        <p className="text-base font-medium"><span className="font-bold">Quantity:</span> {food.quantity}</p>
                        <p className="text-base font-medium"><span className="font-bold">Price:</span> ${food.price}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleUpdate(food._id)} className="btn bg-[#FA8072] w-full normal-case text-white">Update</button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
};

export default AddedFood;