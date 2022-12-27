import React from 'react';
import './List.css';


function List(props) {

  const { list, handleEditReminder} = props;
  

  return (
    <>
      {
        list.map(reminder => {
          return (
            <div key={reminder.id} className='reminder-container'>
              <p className='reminder-date'>{reminder.date}</p>
              <div className='reminder-subcontainer'>
                <p className='reminder-name'>{reminder.reminder}</p>
                <i className='bx bxs-edit-alt' onClick={() => handleEditReminder(reminder.id)}></i>
              </div>
            </div>

          )
        })
      }
    </>
  )
}

export default List
