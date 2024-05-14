import { Link, useLoaderData } from 'react-router-dom';
import bannar2 from '../assets/images/bannar2.jpg';
import { useEffect, useState } from 'react';

const AllFood = () => {
    const foods = useLoaderData();
    const [search, setSearch] = useState("");
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

   

    const itemsPerPage = 9;
    const numberOfPages = Math.ceil(foods.length / itemsPerPage);
    
    const pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
    }
   // console.log(pages);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }    
useEffect(() => {
    fetch(`https://dineease-bdserver.vercel.app/foods?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => res.json())
    .then(data => {
        console.log("Fetched data:", data); 
        setFilteredFoods(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error); 
    });
}, [currentPage]);

const handleSearch = () => {
    const filtered = foods.filter(food =>
        food.food_name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("Filtered data:", filtered); 
    setFilteredFoods(filtered); 
    setCurrentPage(0);
};

    return (
        <div>
            <div className="hero h-72" style={{backgroundImage: `url(${bannar2})`}}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-center text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">DineEase | All Food</h1>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="searchTemplate m-10 border-2 shadow-xl w-1/3 mx-auto p-2 rounded-xl">
                    <input className='p-2 w-72'
                        type="text"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        placeholder="Search for food..."
                    />
                    <button onClick={handleSearch} className='btn ml-14 bg-orange-500  text-white rounded-xl'>Search</button>
                </div>
                <h2 className="text-4xl font-bold text-center">Choose your favorite food!</h2>
                <div className="grid grid-cols-3 gap-10 mt-10 ">
                {(search === "" ? filteredFoods : filteredFoods).map((food) => (
                        <div key={food._id} className="card dark:bg-black bg-base-100 shadow-xl">
                            <figure>
                                <img className="h-60 bg-cover rounded-xl" src={food.food_image} alt={food.food_name} />
                            </figure>
                            <div className="card-body dark:bg-[#120505] dark:text-white ">
                                <h2 className="card-title">Food Name : {food.food_name}</h2>
                                <p>Category : {food.food_category}</p>
                                <div className="card-actions justify-between">
                                    <div>Price: {food.price} <br/> Quantity: {food.quantity}</div>
                                    <Link to={`/singleFood/${food._id}`}>
                                    <button className="btn dark:bg-violet-600 bg-orange-400 text-white">
                                       View Details
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='pagination flex m-10 mx-auto  w-1/3'>
                <button onClick={handlePrevPage}  disabled={currentPage === 0} className='items-center flex hidden px-2  mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-orange-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'>Previous</button>
                {
                    pages.map(page => <button className='items-center flex hidden px-4 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-orange-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
                        onClick={() => setCurrentPage(page)}
                        key={page}
                        >{page}</button>
                    )
                }
                <button onClick={handleNextPage} className='items-center flex hidden px-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-orange-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'>Next</button>
                </div>
        </div>
            </div>
    );
};

export default AllFood;
