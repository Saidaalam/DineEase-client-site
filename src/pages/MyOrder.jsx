import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAuth from "../components/hooks/useAuth";

const MyOrder = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myorder, setMyOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
        fetch(`https://dineease-bdserver.vercel.app/purchase`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setMyOrder(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }
}, [user]);

const handleDelete = id => {
  fetch(`https://dineease-bdserver.vercel.app/purchase/${id}`, {
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
          const remainingSpots = myorder.filter(item => item._id !== id);
          setMyOrder(remainingSpots);        
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
    <div className="container mx-auto mb-6 dark:bg-[#120505] dark:text-white">
      <h2 className="text-4xl font-bold text-center mt-10">Ordered Food Items </h2>
      <div className="overflow-x-auto mt-12">
        <table className="table">
          <thead>
            <tr className="dark:text-white text-center">
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {myorder.map((p) => (
              <tr key={p._id}>
                <td className="text-start">{p.name}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>{p.purchaseDate}</td>
                <td>
                  <button onClick={() => handleDelete(p._id)} className="btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
