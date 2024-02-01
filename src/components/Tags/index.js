import './index.css'

const Tags = props => {
  const {tabDetails, onClickTagButton} = props
  const {displayText, optionId, isTrue} = tabDetails
  const buttonClass = isTrue ? 'bg-button' : 'tag-button'

  const onClickTag = () => {
    onClickTagButton(optionId)
  }

  return (
    <li className="tag">
      <button type="button" className={buttonClass} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default Tags
