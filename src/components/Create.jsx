import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = ({addItem}) => {
    const navigate = useNavigate();
    const [inputValue , setInputValue] = useState('')
    const handleSubmit=(e)=>{
        
        if(inputValue.trim()){

            console.log('Input value:', inputValue);

            addItem(inputValue);
            setInputValue('');
            
            navigate('/');
        }else{
        console.log('input value is empty or only whitespace');
        }
    };
   console.log(setInputValue);
    const goToHomePage = () => {
        navigate('/');
      };
  return (
    <div className='create'>
        <div className='borderr'>

     <div className='tittle'>
     <h4>    Create new module
</h4>
<button onClick={()=>goToHomePage()}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.81694 3.93306C4.57286 3.68898 4.17714 3.68898 3.93306 3.93306C3.68898 4.17714 3.68898 4.57286 3.93306 4.81694L9.11612 10L3.93306 15.1831C3.68898 15.4271 3.68898 15.8229 3.93306 16.0669C4.17714 16.311 4.57286 16.311 4.81694 16.0669L10 10.8839L15.1831 16.0669C15.4271 16.311 15.8229 16.311 16.0669 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8839 10L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L10 9.11612L4.81694 3.93306Z" fill="#717171"/>
</svg>

        </button>

     </div>
     <div className='module'>
        Module name 
       
       <input className='inputt' type="text" name="" id="" placeholder='' onChange={(e)=> setInputValue(e.target.value)} />
     </div>
     <div className="btnn">
     <button type="button" class="btn btn-light" onClick={()=>goToHomePage()}>Cancel</button>
     <button type="button" class="btn btn-primary" onClick={()=>handleSubmit()}>Create</button>
     </div>
        </div>

    </div>
  )
}

export default Create