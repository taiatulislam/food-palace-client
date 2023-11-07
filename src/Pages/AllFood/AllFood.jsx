import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const AllFood = () => {

    const allFoods = useLoaderData();
    const [foods, setFoods] = useState(allFoods);

    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;

        fetch(`http://localhost:5000/allFoods/${name}`)
            .then(res => res.json())
            .then(data => setFoods(data))
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mt-5">
                <form onSubmit={handleForm}>
                    <input type="text" name="name" placeholder="Burger, Pizza, Paste ....." className="pl-2 border-2 p-2 border-[#FA8072] rounded-l-lg w-1/3" />
                    <button className="text-white bg-[#FA8072] border-2 py-2 px-5 border-[#FA8072] rounded-r-lg">Search</button>
                </form>
            </div>
            <div className="grid grid-cols-3 gap-7 mt-10">
                {
                    foods.map(food => <div key={food._id} className="card card-compact bg-base-100 shadow-xl">
                        <figure><img src={food.image} alt="food" className="h-[300px] w-full rounded-b-lg" /></figure>
                        <div className="card-body">
                            <h2 className="text-2xl font-semibold">{food.name}</h2>
                            <p className="text-base font-medium"><span className="font-bold">Category:</span> {food.category}</p>
                            <p className="text-base font-medium"><span className="font-bold">Quantity:</span> {food.quantity}</p>
                            <p className="text-base font-medium"><span className="font-bold">Price:</span> ${food.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn bg-[#FA8072] w-full normal-case text-white">Details</button>
                            </div>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default AllFood;