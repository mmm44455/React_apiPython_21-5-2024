import './sytle.css'
const BoardItem = ({boardName,boardWorkspace,avatar})=>{
    return(
        <div className='boardItem'>
          
        
        <img src={avatar}></img>
        <div className='board-title'>{boardName}</div> 
        </div>
    )
}
export default BoardItem