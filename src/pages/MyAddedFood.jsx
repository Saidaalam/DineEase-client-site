import { useEffect, useState } from "react";
import useAuth from "../components/hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyAddedFood = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://dineease-bdserver.vercel.app/foods?email=${user.email}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    return res.json();
                })
                .then((data) => {
                    setOrder(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [user]);

const handleDelete = id => {
    fetch(`https://dineease-bdserver.vercel.app/foods/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to delete food");
        }
        return res.json();
    })
    .then(data => {
        if (data.deletedCount > 0) {
            console.log('Deleted Successfully');
            const remainingSpots = order.filter(item => item._id !== id);
            setOrder(remainingSpots);        
        }
    })
    .catch((error) => {
        setError(error.message);
    })
    .finally(() => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
               console.log('delete confirmed');
            }
        });
    });
}

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>Error: {error}</div>;
}


  return (
    <div className="dark:bg-[#120505] dark:text-white px-10">
            <h2 className="text-4xl font-bold text-center mt-10">Ordered Food Items : {order.length}</h2>
           
            <div className="overflow-x-auto mt-10">
  <table className="table">
    <thead>
                        <tr className="dark:text-white">
                            <th>Food Item</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Update Button</th>
                            <th>Delete Button</th>
                        </tr>
                    </thead>
                    <tbody>
    {order.map((p) => (
        <tr key={p._id}>
            <td>
                <div className="avatar">
                    <div className="rounded w-24 h-24">
                        <img src={p.food_image} alt={p.food_name} />
                    </div>
                </div>
            </td>
            <td>{p.food_name}</td>
            <td>{p.food_category}</td>
            <td>{p.price}</td>
            <td><Link to={`/updatedFood/${p._id}`}><button className="btn">Update</button></Link></td>
            <td><button onClick={() => handleDelete(p._id)} className="btn">Delete</button></td>
        </tr>
    ))}
</tbody>
  </table>
</div>
</div>
  )
}

export default MyAddedFood;