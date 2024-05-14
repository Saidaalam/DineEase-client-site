import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatedFood = () => {
  const {id} = useParams();
    const [food, setFood] = useState([]);

    useEffect(() => {
      fetch(`https://dineease-bdserver.vercel.app/updatedFood/${id}`)
        .then(res => res.json())
        .then(data => {
          setFood(data);
        });
    }, [id]);

const handleUpdateFood = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get('name');
  const category = formData.get('category');
  const image = formData.get('image');
  const quantity = formData.get('quantity');
  const origin = formData.get('origin');
  const price = formData.get('price');
  const description = formData.get('description');

  const info = { name, origin, category, image, price, quantity, description};

  console.log(info);

  fetch(`https://dineease-bdserver.vercel.app/updatedFood/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(info)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.modifiedCount > 0){
        Swal.fire({
            title: 'Success!',
            text: 'Food updated successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    }else {
        Swal.fire({
            title: 'Error!',
            text: 'Food do not updated. Try Again',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }
  })
};


    return (
        <div className="dark:bg-[#120505] dark:text-white  px-10">
            <div className="pt-10">
                <div className="shadow-lg p-5 border dark:bg-[#1a2641d5]">
                    <div className="mt-5 mb-8">
                        <p className="text-center text-3xl font-semibold">
                            <span className="dark:text-white text-orange-400">
                                Update Food Item : {food.food_name}
                            </span>
                        </p>
                    </div>
                    <form onSubmit={handleUpdateFood}>
                        <div className="flex gap-8 ">
                            <div className="flex-1">
                                <label className="block mb-2 dark:text-white" htmlFor="name">
                                    Food Name
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    placeholder="Food name"
                                    id="name"
                                    name="name"
                                    defaultValue={food.food_name}
                                />

                                <label
                                    className="block mt-4 mb-2 dark:text-white"
                                    htmlFor="Category"
                                >
                                    Food Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    defaultValue={food.category}
                                >
                                    <option value="Category">Select Category</option>
                                    <option value="Main Course">Main Course</option>
                                    <option value="Appetizer">Appetizer</option>
                                    <option value="Salad">Salad</option>
                                    <option value="Dessert">Dessert</option>
                                </select>

                                <label
                                    className="block mt-4 mb-2 dark:text-white"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    placeholder="Enter Price"
                                    id="price"
                                    name="price"
                                    defaultValue={food.price}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 dark:text-white" htmlFor="image">
                                    Food Image
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    placeholder="Enter Image URL"
                                    id="image"
                                    name="image"
                                    defaultValue={food.food_image}
                                />
                                <label className="block mb-2 mt-4 dark:text-white" htmlFor="number">
                                    Quantity
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="value"
                                    placeholder="Quantity"
                                    id="quantity"
                                    name="quantity"
                                    defaultValue={food.quantity}
                                />
                                <label className="block mb-2 mt-4 dark:text-white" htmlFor="origin">
                                    Food Origin
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    placeholder="Origin"
                                    id="origin"
                                    name="origin"
                                    defaultValue={food.food_origin}
                                />

                            </div>
                        </div>
                        <label className="block mb-2 dark:text-white" htmlFor="description">
                            Description
                        </label>
                        <input
                            className="w-full p-10 border rounded-md focus:outline-[#274675]"
                            type="text"
                            placeholder="Description"
                            id="description"
                            name="description"
                            defaultValue={food.description}
                        />
                        <input
                            className="px-4 w-full py-2 mt-4 rounded  bg-orange-500 duration-200 text-white cursor-pointer font-semibold"
                            type="submit"
                            value="Update Item"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatedFood;
