import React from 'react'
import Notes from './Notes';


const Home = () => {
  
  return (
    <div>
      <div className='container'>
        <h1>Add a note</h1> 
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description </label>
            <input type="text" className="form-control" id="description"/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
         </form>
        </div>

       <Notes/>
        
    </div>
  )
}

export default Home;
