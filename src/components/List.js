
import './List.css';


function List(props) {

  const { list, handleEditReminder, handleTaskDone } = props;


  return (
    <>
      {
        list.map(reminder => {
          return (
            <div key={reminder.id} className='reminder-container'>
              <p className='reminder-date'>{reminder.dateString}</p>
              <div className='reminder-subcontainer'>
                <p className='reminder-name'>{reminder.reminder}</p>
                <div>
                  <i className='bx bx-check-circle' onClick={() => handleTaskDone(reminder.id)}></i>
                  <i className='bx bxs-edit-alt' onClick={() => handleEditReminder(reminder.id)}></i>
                </div>

              </div>
            </div>

          )
        })
      }
    </>
  )
}

export default List
