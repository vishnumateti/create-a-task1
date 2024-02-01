import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import TasksList from './components/TasksList'
import Tags from './components/Tags'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isTrue: false,
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    inputTask: '',
    inputTab: tagsList[0].optionId,
    activeTab: '',
    newList: tagsList,
  }

  enterTask = event => {
    this.setState({inputTask: event.target.value})
  }

  changeTab = event => {
    this.setState({inputTab: event.target.value})
  }

  onClickTagButton = tag => {
    const {newList} = this.state
    const findItem = newList.find(item => item.optionId === tag)

    if (findItem.isTrue === false) {
      const filteredList = newList.map(item => {
        if (item.optionId === tag) {
          return {...item, isTrue: true}
        }
        return {...item, isTrue: false}
      })
      this.setState({newList: filteredList, activeTab: tag})
    }
    if (findItem.isTrue === true) {
      const filteredList = newList.map(item => {
        if (item.optionId === tag) {
          return {...item, isTrue: false}
        }
        return item
      })
      this.setState({newList: filteredList, activeTab: ''})
    }
  }

  addTaskButton = event => {
    event.preventDefault()

    const {inputTask, inputTab} = this.state

    if (inputTask === '') {
      // eslint-disable-next-line
      alert('Enter the task')
    } else {
      const newTask = {
        id: uuid(),
        inputTask,
        inputTab,
      }
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        inputTab: tagsList[0].optionId,
        inputTask: '',
      }))
    }
  }

  render() {
    const {inputTask, inputTab, tasksList, activeTab, newList} = this.state
    const filteredTaskList = tasksList.filter(each =>
      each.inputTab.includes(activeTab),
    )

    return (
      <div className="bg-container">
        <div>
          <form className="form-container" onSubmit={this.addTaskButton}>
            <h1 className="heading">Create a task!</h1>
            <div className="input-container">
              <label className="label" htmlFor="Task">
                Task
              </label>
              <input
                className="input"
                placeholder="Enter the task here"
                value={inputTask}
                id="Task"
                type="text"
                onChange={this.enterTask}
              />
              <label className="label" htmlFor="Tags">
                Tags
              </label>
              <select
                className="input"
                value={inputTab}
                id="Tags"
                onChange={this.changeTab}
              >
                {tagsList.map(eachTag => (
                  <option value={eachTag.optionId} key={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="ul-container">
            {newList.map(each => (
              <Tags
                key={each.optionId}
                tabDetails={each}
                onClickTagButton={this.onClickTagButton}
              />
            ))}
          </ul>

          <h1 className="tags-heading">Tasks</h1>
          <ul className="tasks-container">
            {filteredTaskList.length === 0 ? (
              <p className="no-tasks-para">No Tasks Added Yet</p>
            ) : (
              filteredTaskList.map(eachTask => (
                <TasksList
                  key={eachTask.optionId}
                  taskDetails={eachTask}
                  tags={tagsList}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
