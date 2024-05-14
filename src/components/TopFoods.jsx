import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopFoods = () => {
    const [topFoods, setTopFoods] = useState([]);

    useEffect(() => {
        // Fetch food items data from the backend
        fetch("https://dineease-bdserver.vercel.app/foods")
            .then(response => response.json())
            .then(data => {
                const sortedFoods = data.sort((a, b) => b.purchase_count - a.purchase_count);
                const topSixFoods = sortedFoods.slice(0, 6);
                setTopFoods(topSixFoods);
            })
            .catch(error => {
                console.error('Error fetching top foods data:', error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-4xl font-bold text-center">Top Selling Foods</h2>
            <div className="grid grid-cols-3 gap-10 mt-10">
                {topFoods.map(food => (
                    <div key={food._id} className="card dark:bg-black bg-base-100 shadow-xl">
                        <figure>
                            <img className="h-60 bg-cover rounded-xl" src={food.food_image} alt={food.food_name} />
                        </figure>
                        <div className="card-body dark:bg-[#120505] dark:text-white">
                            <h2 className="card-title">Food Name: {food.food_name}</h2>
                            <p>Category: {food.food_category}</p>
                            <p>Price: {food.price}</p>
                            <Link to={`/singleFood/${food._id}`}>
                            <button className="btn dark:bg-violet-600 mt-2 bg-orange-500 text-white w-full">
                               Details
                            </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
           <div className="mx-auto w-1/4">
           <Link to={`/allFood`}>
                 <button className="btn dark:bg-violet-600 ml-10 mt-10 w-64 bg-orange-500 text-white">
                    All Foods
                    </button>
                 </Link>
           </div>
        </div>
    );
};

export default TopFoods;
