import { useState, useEffect } from 'react';
import bannar3 from '../assets/images/gallery.jpg';
import Swal from 'sweetalert2';
import useAuth from "../components/hooks/useAuth";

const Gallery = () => {
    const [foods, setFoods] = useState([]);
    const { user } = useAuth() || {};
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [experience, setExperience] = useState({
        userName: 'User Name', // Assuming this is dynamically set
        feedback: '',
        imageURL: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dineease-bdserver.vercel.app/gallery');
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [hoveredImage, setHoveredImage] = useState(null);

    const handleImageHover = (id) => {
        setHoveredImage(id);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperience({ ...experience, [name]: value });
    };

    const handleAddPic = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const imgUrl = formData.get('imgUrl');
        const feedback = formData.get('feedback');
        const displayName = user.displayName;
        const email = user.email;
    
        const newPic = { feedback, imgUrl, displayName, email };

        console.log(newPic);

        fetch("https://dineease-bdserver.vercel.app/gallery", {
            method : "POST",
            headers : {
              "Content-type" : "application/json"
            },
            body : JSON.stringify(newPic)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Feedback added successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Feedback do not added. Try Again',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        });
    };

    return (
        <div>
            <div className="hero h-72" style={{backgroundImage: `url(${bannar3})`}}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-center text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">DineEase | Gallery</h1>
                    </div>
                </div>
            </div>
            <h2 className='text-3xl font-bold text-center mt-10'>My Gallery</h2>
            <div className="gallery grid grid-cols-4 gap-10 mt-10 relative">
            {foods.map(food => (
        <div 
            key={food._id} 
            className="image-container relative" 
            onMouseEnter={() => handleImageHover(food._id)} 
            onMouseLeave={handleImageLeave}
        >
            <img 
                src={food.imgUrl} 
                alt={food.food_name} 
                className="h-60 w-72 rounded-xl"
            />
            {hoveredImage === food._id && (
                <div className="image-overlay absolute top-0 left-0 w-72 h-full bg-black bg-opacity-50 text-white text-lg font-bold flex justify-center items-center">
                    <div className="text-center">
                        <p>User Name: {food.displayName}</p>
                        <p>Feedback: {food.feedback}</p>
                    </div>
                </div>
            )}
        </div>
    ))}
</div>
            <div className='flex justify-center mx-auto mt-10 mb-10'>
                <button onClick={openModal} className='btn bg-orange-500 text-white w-1/3'>Add Feedback</button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={closeModal}>
                            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M6.328 9l-5.14 5.141a1 1 0 1 0 1.415 1.415L7.74 10.415l5.141 5.14a1 1 0 1 0 1.415-1.415L9.457 9l5.14-5.141a1 1 0 1 0-1.415-1.415L7.74 7.585 2.6 2.445A1 1 0 1 0 1.186 3.86L6.327 9z" />
                            </svg>
                            <span className="text-sm">(Close)</span>
                        </div>
                        <div className="modal-content py-4 text-left px-6">
                            <form onSubmit={handleAddPic}>
                            <label className="block mb-2" htmlFor="userName">User Name:</label>

                                <input id="userName" name="userName" type="text" value={experience.userName} readOnly className="w-full mb-2 px-3 py-2 border rounded"/>
                                <label className="block mb-2" htmlFor="feedback">Feedback or Experience:</label>
                                <textarea id="feedback" name="feedback" value={experience.feedback} onChange={handleChange} required className="w-full mb-2 px-3 py-2 border rounded"></textarea>
                                <label className="block mb-2" htmlFor="imgUrl">Image URL:</label>
                                <input id="imgUrl" name="imgUrl" type="text" required className="w-full mb-4 px-3 py-2 border rounded"/>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
