import { Link } from "react-router-dom";
import bgImg from '../../assets/images/login.png';
import { useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        document.title = "DineEase";
      }, []);


    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        //const name = form.get("name");
        //const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        //console.log(name, photo, email, password);
         
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters or more');
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Password should have at least one uppercase letter');
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error('Password should have at least one lowercase letter');
            return;
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then((result) => {
            console.log(result.user);
            toast.success('Registration successful');
        })
        .catch((error) => {
            console.error(error);
            toast.error('Registration failed. Please try again.');
        });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex dark:bg-[#120505] dark:text-white">
           <div className="mx-28"><img src={bgImg}></img></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm">
                <h2 className="text-3xl text-center dark:text-white">Register your account</h2>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Your Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Photo url" name="photo" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="input input-bordered w-80" 
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-xl absolute right-4 top-3 dark:text-black"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
                        </div>
                        <ToastContainer />
                        <div className="form-control mt-4">
                            <button type="submit" className="btn bg-slate-900 text-white">Register</button>
                        </div>
                    </form>
                    <p className="text-center dark:text-black mb-6">Already have an account? <Link to="/login"><span className="text-red-700">Login</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
