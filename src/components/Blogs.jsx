
import blog1 from '../assets/images/blog1.png'
import blog2 from '../assets/images/blog3.jpg'
import blog3 from '../assets/images/blog2.jpg'
import blog4 from '../assets/images/blog4.jpg'

const Blogs = () => {
    return (
        <section className="dark:bg-gray-100 dark:text-gray-800">
            <h2 className="text-3xl text-center font-bold mt-10 mb-6">OUR LATEST NEWS & ARTICLE</h2>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12" >
            <a rel="noopener noreferrer" href="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
                <img src={blog1} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
                <div className="p-6 space-y-2 lg:col-span-5">
                    <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline mb-2"> A Culinary Journey</h3>
                    <span className="text-xs dark:text-gray-600">March 19, 2024</span>
                    <p className='mt-4'>In the fast-paced world of hospitality, managing a restaurant efficiently while delivering exceptional dining experiences can be a challenging task. However, with the advent of modern technology, restaurant owners and managers now have access to powerful tools that can simplify their operations and elevate their service standards.
                    </p>
                </div>
            </a>
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                    <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={blog2} />
                    <div className="p-4 space-y-2">
                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Dishes and Discoveries</h3>
                        <span className="text-xs dark:text-gray-600">January 21, 2024</span>
                        <p>DineEase could be categorized as a lifestyle focusing on experiences, recipes, food culture, and storytelling within the realm of gastronomy. It  is the ultimate solution for streamlining restaurant management processes and delighting customers.</p>
                    </div>
                </a>
                <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                    <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={blog3} />
                    <div className="p-4 space-y-2">
                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">A Feast for the Senses</h3>
                        <span className="text-xs dark:text-gray-600">April 22, 2024</span>
                        <p>It is a game-changer for the hospitality industry. By simplifying operations, enhancing customer service, and providing valuable insights, DineEase enables restaurant owners to run their businesses more efficiently and effectively. </p>
                    </div>
                </a>
                <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                    <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={blog4} />
                    <div className="p-4 space-y-2">
                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Tales from the Kitchen</h3>
                        <span className="text-xs dark:text-gray-600">May 03, 2024</span>
                        <p>DineEase takes you on a journey into the heart of the kitchen, where every dish tells a story. If you are a passionate foodie, prepare to be inspired and delighted by our tales from the kitchen..</p>
                    </div>
                </a>
            </div>
        </div>
    </section>
    );
};

export default Blogs;