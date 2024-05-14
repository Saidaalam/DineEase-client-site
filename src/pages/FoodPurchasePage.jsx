import { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../components/hooks/useAuth';

const FoodPurchasePage = () => {
  const {user} = useAuth() || {};
  const [formData, setFormData] = useState([]);


  const handlePurchase = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const purchaseDate = formData.get('date');
    const quantity = formData.get('quantity');
    const price = formData.get('price');
    const buyerName = user.displayName;
    const buyerEmail = user.email;

    const info = {name, price, quantity, purchaseDate, buyerName, buyerEmail};

    //console.log(info);

        fetch(`https://dineease-bdserver.vercel.app/purchase`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(info)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.insertedId){
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
    <div className="dark:bg-[#120505] dark:text-white px-10">
      <div className="pt-10">
        <div className="shadow-lg p-5 border dark:bg-[#1a2641d5]">
          <div className="mt-5 mb-8">
            <p className="text-center text-3xl font-semibold">
              <span className="dark:text-white text-orange-400">
                Purchase Food Item : {formData.food_name}
              </span>
            </p>
          </div>
          <form onSubmit={handlePurchase}>
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
                                />
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
                                />
                                 <label
                                    className="block mt-4 mb-2 dark:text-white"
                                    htmlFor="date"
                                >
                                    Buying date
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="date"
                                    placeholder="Buying date"
                                    id="date"
                                    name="date"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 dark:text-white" htmlFor="number">
                                    Quantity
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="value"
                                    placeholder="Quantity"
                                    id="quantity"
                                    name="quantity"
                                />
                                <label className="block mb-2 mt-4 dark:text-white" htmlFor="origin">
                                   Buyer Name
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    placeholder="Buyer Name"
                                    id="origin"
                                    name="origin"
                                    defaultValue={user.displayName}
                                />
                           <label
                                    className="block mb-2 mt-4 dark:text-white"
                                    htmlFor="email"
                                >
                                    Buyer Email
                                </label>
                                <input
                                    className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                    type="text"
                                    placeholder="Enter Email"
                                    id="email"
                                    name="email"
                                    defaultValue={user.email}
                                />
                            </div>
                        </div>
                        <input
                            className="px-4 w-full py-2 mt-10 rounded  bg-orange-500 duration-200 text-white cursor-pointer font-semibold"
                            type="submit"
                            value="Purchase"
                        />
                    </form>
        </div>
      </div>
    </div>
  );
};

export default FoodPurchasePage;
