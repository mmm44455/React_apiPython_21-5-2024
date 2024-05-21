import './sytle.css'
import React from 'react';
import BoardItem from '../../../../../common/componets/BoardItem';
const StarredBorad = ({board})=>{
    return(
        <>
            <div className='boardItem-1'>
                {board.map(board => <BoardItem key={board.boardName} {...board} />)}
                </div>
            
        </>
    )
}
export default StarredBorad