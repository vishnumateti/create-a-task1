import './index.css'

const TasksList = props => {
  const {taskDetails, tags} = props
  const {inputTask, inputTab} = taskDetails
  const findItem = tags.find(item => item.optionId === inputTab)
  console.log(taskDetails)

  return (
    <li className="task-list-item">
      <p className="task-para">{inputTask}</p>
      <p className="tag-para">{findItem.displayText}</p>
    </li>
  )
}

export default TasksList
