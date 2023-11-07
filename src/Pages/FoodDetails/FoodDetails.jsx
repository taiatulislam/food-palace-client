import { useLoaderData } from "react-router-dom";

const FoodDetails = () => {

    const food = useLoaderData();
    console.log(food);

    return (
        <div className="max-w-7xl mx-auto py-5">
            <div className="flex items-center">
                <div className="w-2/5">
                    <figure><img src={food.image} alt="food" className="rounded-lg w-full h-screen" /></figure>
                </div>
                <div className="w-3/5 border-2 border-[#FA8072] rounded-lg px-5">
                    <h2 className="text-2xl my-3"><span className="font-semibold">Food Name:</span> {food.name}</h2>
                    <p className="text-lg my-3"><span className="font-semibold">Food Category:</span> {food.category}</p>
                    <p className="text-lg my-3"><span className="font-semibold">Food Price: $</span> {food.price}</p>
                    <p className="text-lg my-3"><span className="font-semibold">Made By:</span></p>
                    <p className="text-lg my-3"><span className="font-semibold">Food Origin:</span> {food.origin}</p>
                    <p className="text-lg my-3"><span className="font-semibold">Description:</span> {food.details}</p>
                    <button className="btn normal-case text-white bg-[#FA8072] w-full my-3">Order</button>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;