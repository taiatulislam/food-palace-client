import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'

const OrderedFood = () => {

    const foods = useLoaderData();
    const [loadData, setLoadData] = useState(foods);

    const handleDelete = id => {
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Food delete',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    const remaining = loadData.filter(food => food._id !== id);
                    setLoadData(remaining);
                }
            })
    }

    return (
        <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
            {
                loadData.map(food => <div key={food._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure><img src={food.image} alt="food" className="h-[300px] w-full rounded-b-lg" /></figure>
                    <div className="card-body">
                        <h2 className="text-2xl font-semibold">{food.name}</h2>
                        <p className="text-base font-medium"><span className="font-bold">Category:</span> {food.category}</p>
                        <p className="text-base font-medium"><span className="font-bold">MadeBy:</span> {food.madeBy}</p>
                        <p className="text-base font-medium"><span className="font-bold">Buying Date:</span> {food.date}</p>
                        <p className="text-base font-medium"><span className="font-bold">Price:</span> ${food.price}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleDelete(food._id)} className="btn bg-[#FA8072] w-full normal-case text-white">Delete</button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
};

export default OrderedFood;