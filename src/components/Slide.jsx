import { Link } from 'react-router-dom'

const Slide = ({ image, text }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/50'>
        <div className='text-center'>
          <h1 className='text-3xl w-2/3 mx-auto mb-6 font-semibold text-white lg:text-4xl'>
            {text}
          </h1>
          <br />
          <Link
            to='/allFood'
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
          >
            Explore Our Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide