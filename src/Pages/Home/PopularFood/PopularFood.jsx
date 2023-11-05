import { useEffect, useState } from "react";

const PopularFood = () => {

    const [foods, setFoods] = useState([])

    useEffect(() => {
        fetch('/food.json')
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [])
    return (
        <div className="max-w-7xl mx-auto mt-20">
            <h2 className="text-5xl font-bold text-center my-10 "><span className="border-b-[5px] border-[#FA8072]">Top Products</span></h2>
            <div className="grid grid-cols-3 gap-7">
                {
                    foods.map(food => <div key={food.id} className="card card-compact bg-base-100 shadow-xl">
                        <figure><img src={food.image} alt="food" className="h-[300px] w-full" /></figure>
                        <div className="card-body">
                            <h2 className="text-2xl font-semibold">{food.name}</h2>
                            <p className="text-base font-medium">Price: ${food.price}</p>
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

export default PopularFood;