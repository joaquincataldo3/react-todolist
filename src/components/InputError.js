
import './InputError.css'

function InputErorr(props) {

  const { error } = props;

  return (
  
      <div className='error-container'>
        <p className='error-p'>You must {error}</p>
      </div>
    
  )
}

export default InputErorr
