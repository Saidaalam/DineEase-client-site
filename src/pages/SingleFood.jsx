import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleFood = () => {
    const { id } = useParams();
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch("https://dineease-bdserver.vercel.app/foods")
            .then(response => response.json())
            .then(data => {
                setFoods(data);
            })
            .catch(error => {
                console.error('Error fetching tour data:', error);
            });
    }, []);

    const food = foods.find(food => food._id === id);

    if (!food) {
        return <span className="loading loading-bars loading-lg"></span>;
    }

    const { food_name, food_image, food_category, made_by, description, price, quantity, food_origin } = food;

    return (
        <div className='dark:bg-[#120505] dark:text-white'>
            <div className="card card-side bg-base-100 shadow-xl mt-4">
                <figure className="p-4 ml-14 w-screen">
                    <img className="h-full rounded-xl" src={food_image} alt={food_name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold">Food Name : {food_name}</h2>
                    <p className="mt-4 text-lg"><span className="font-semibold">Description : </span>{description}</p>
                    <div className="mb-2"><span className="font-semibold">Category : </span>{food_category}</div>
                    <div className="mb-2"><span className="font-semibold">Made by : </span>{made_by}</div>
                    <div className="mb-2"><span className="font-semibold">Food Origin : </span>{food_origin}</div>
                    <div className="mb-2"><span className="font-semibold">Price : </span>{price}</div>
                    <div><span className="font-semibold">Quantity : </span>{quantity}</div>
                    <Link to={`/purchase/${id}`} className="btn mt-4 dark:bg-violet-600 bg-orange-500 text-white">Purchase</Link>
                </div>
            </div>
        </div>
    );
};

export default SingleFood;
