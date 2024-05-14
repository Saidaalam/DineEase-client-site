
import Blogs from '../components/Blogs'
import Carousel from '../components/Carousel'
import TopFoods from '../components/TopFoods'
import Newsletter from './Newsletter'

const Home = () => {
  return (
    <div>
      <Carousel />
      <TopFoods/>
      <Blogs/>
      <Newsletter/>
    </div>
  )
}

export default Home