import { useContext } from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  return (
    <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
      <div className='flex-1'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-7' src={logo} alt='' />
          <span className='text-orange-400 font-bold text-lg'>DineEase</span>
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 mx-2 text-orange-400 font-bold text-lg'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/allFood'>All Food</Link>
          </li>
          <li>
            <Link to='/gallery'>Gallery</Link>
          </li>
          <li>
            <Link to='/foods'>Add Food Item</Link>
          </li>
          <li>
            <Link to='/addedFoods'>My Added Food</Link>
          </li>
          <li>
            <Link to='/myOrder'>My Purchased Item</Link>
          </li>
          
          {!user && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to='/allFood' className='justify-between'>
                My added food items
                </Link>
              </li>
              <li>
                <Link to='/foods'>Add a food item</Link>
              </li>
              <li>
                <Link to='/addedFoods'>My ordered food items</Link>
              </li>
              <li className='mt-2'>
                <button
                  onClick={logOut}
                  className='bg-gray-200 block text-center'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar