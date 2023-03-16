
import './NotFound.css'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className='not-found-container'>
       <h1 className='not-found-title'>The page you are trying to look for, doesn't exist</h1>
       <Link to='/' className='back-home-anchor'>
       <h3 className='not-found-subtitle'>Go back home</h3>
       </Link>
    </main>
  )
}

export default NotFound