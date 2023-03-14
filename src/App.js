
import List from './Comps/List';
import InputError from './Comps/InputError';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import './App.css';

function App() {

  const [toDo, setToDo] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const [nameBeingEdited, setNameBeingEdited] = useState('');
  const [scheduledDateBeingEdited, setScheduledDateBeingEdited] = useState('');

  const [list, setList] = useState([]);

  const [isAdded, setIsAdded] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [toDoEmpty, setToDoEmpty] = useState(false);
  const [scheduledDateEmpty, setScheduledDateEmpty] = useState(false);


  const convertDate = (date) => {
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`
    return formattedDate;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (toDo && scheduledDate && !isEditing) {
      setToDoEmpty(false)
      setScheduledDateEmpty(false);
      const newDate = convertDate(scheduledDate);
      const objectToAdd = {
        id: uuid(),
        reminder: toDo,
        date: scheduledDate,
        dateString: newDate
      };
      setIsAdded(true);
      setList([...list, objectToAdd]);
      const timeOut = setTimeout(() => {
        setIsAdded(false)
      }, 1000);
      setScheduledDate('');
      setToDo('')
      return () => {
        clearTimeout(timeOut) //cleanup function
      }
    } else if (toDo && !scheduledDate){
      setToDoEmpty(false)
      setScheduledDateEmpty(true);
    } else if (!toDo && scheduledDate) {
      setToDoEmpty(true)
      setScheduledDateEmpty(false);
    } else {
      setScheduledDateEmpty(true);
      setToDoEmpty(true);
    }
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (nameBeingEdited && scheduledDateBeingEdited) {
      setToDoEmpty(false)
      setScheduledDateEmpty(false);
      const newDate = convertDate(scheduledDateBeingEdited);
      setList(list.map(item => {
        if (item.id === currentEditId) {
          return { ...item, reminder: nameBeingEdited, date: scheduledDateBeingEdited, dateString: newDate }
        }
        return item
      }))
      setCurrentEditId(null);
      setNameBeingEdited('');
      setScheduledDateBeingEdited('');
      setIsEditing(false);
    }
  }

  const handleTaskDone = (idToDelete) => {
    const arrayFiltered = list.filter(reminder => {
      return reminder.id !== idToDelete
    });
    setList(arrayFiltered);
    setIsEditing(false)
  }

  const handleClearList = () => {
    setList([]);
    setToDo('');
    setScheduledDate('')
  }

  const handleEditReminder = (editId) => {
    setIsEditing(true);
    setCurrentEditId(editId)
    const reminderToEdit = list.find(item => {
      return item.id === editId;
    })
    setNameBeingEdited(reminderToEdit.reminder);
    setScheduledDateBeingEdited(reminderToEdit.date)
  }


  return (

    <section>
      <div className='title-form-container'>
        <h2>Daily task management has never been easier !</h2>
        <h3>Set your reminders</h3>
        <form onSubmit={handleFormSubmit} className={`add-reminder-form ${isEditing && 'form-inactive'}`}>

          <div className='input-label-container'>

            <label htmlFor="name">To do</label>
            <input type="text" name='name' className='add-reminder-input'
              onChange={(e) => setToDo(e.target.value)} value={toDo} placeholder='Meeting with Alex...' />
            {toDoEmpty && <InputError error={'type a name for the todo'}/>}
          </div>

          <div className='input-label-container'>

            <label htmlFor="date">Date</label>
            <input type="date" name='date' className='add-reminder-input'
              onChange={(e) => setScheduledDate(e.target.value)} value={scheduledDate} />
            {scheduledDateEmpty && <InputError error={'select a date'}/>}
          </div>

          <button type='Submit' className={`reminder-form-btn ${isAdded ? 'ADDED' : isEditing ? 'EDITING' : 'ADD'} `}>{isAdded ? 'ADDED' : isEditing ? 'EDITING' : 'ADD'}</button>;
        </form>
      </div>
      <div className='list-container'>
        {
          isEditing &&
          <div className='edit-reminder-container'>
            <form className='edit-reminder-form' onSubmit={handleEditFormSubmit}>
              <div className='edit-reminder-inputs-container'>
                <input className='edit-reminder-input' type="date" defaultValue={scheduledDateBeingEdited} onChange={(e) => setScheduledDateBeingEdited(e.target.value)} />
                <input className='edit-reminder-input' type="text" value={nameBeingEdited} onChange={(e) => setNameBeingEdited(e.target.value)} />
              </div>
              <div className='edit-reminder-btn-container'>
                <input type="submit" value={'SUBMIT'} className='edit-reminder-btn' />
                
              </div>
            </form>

          </div>
        }
        {
          list.length > 0 && !isEditing &&
          <>
            <List list={list} handleTaskDone={handleTaskDone} handleEditReminder={handleEditReminder} />
            <div className='clear-list-btn-container'>
              <button className='clear-list-btn' onClick={handleClearList}>CLEAR LIST</button>
            </div>
          </>
        }
      </div>

    </section>
  );
}

export default App;
