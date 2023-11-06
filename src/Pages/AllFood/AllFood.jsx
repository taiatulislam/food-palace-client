import { useEffect, useState } from "react";

const AllFood = () => {

    const [foods, setFoods] = useState([])

    useEffect(() => {
        fetch('/food.json')
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-7 mt-10">
                {
                    foods.map(food => <div key={food.id} className="card card-compact bg-base-100 shadow-xl">
                        <figure><img src={food.image} alt="food" className="h-[300px] w-full rounded-b-lg" /></figure>
                        <div className="card-body">
                            <h2 className="text-2xl font-semibold">{food.name}</h2>
                            <p className="text-base font-medium"><span className="font-bold">Category:</span> {food.category}</p>
                            <p className="text-base font-medium"><span className="font-bold">Price:</span> ${food.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn bg-[#FA8072] w-full normal-case text-white">Details</button>
                            </div>
                        </div>
                    </div>
                    )}
            </div>
            <div className="my-10 text-center">
                <button className="btn normal-case text-[#FA8072] border-2 border-[#FA8072]">See all</button>
            </div>
        </div>
    );
};

export default AllFood;