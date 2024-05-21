import React ,{useEffect, useReducer, useState} from 'react';
import StarredBorad from './components/StarredBoardList';
import boardSevice from '../../../common/api/boardSevice';
import Loading from '../../../accset/img/loading.gif'

const reducer = (state,action)=>{
  switch(action.type){
    case 'FETCH_STARRED_BOARDS_SUCCESS':
       return {
        ...state,starredBoards:action.payload
  }
  case 'CHANGE_LOADING':
    return{
      ...state,isLoading:action.payload
    }
  case 'CHANGE_PAGE':
    return{
      ...state,page: action.payload
    }
  default:
    return state;
}
}
const HomePage = () => {
    // Nội dung của component HomePage
   const [state,dispatch]=useReducer(reducer,{
    starredBoards:[],
    isLoading:false,
    page:0
   })
    
       useEffect(()=>{
      const fetchStarredBoard = async()=>{
      try{
        dispatch({type:'CHANGE_LOADING',payload:true})
        const reponse = await boardSevice.getStarredBorad(state.page,2)
        const {totalPge,content} = reponse
        dispatch({type:'FETCH_STARRED_BOARDS_SUCCESS',payload:content})
        dispatch({type:'CHANGE_LOADING',payload:false})
        dispatch({type:'CHANGE_PAGE',payload:state.page})
      }
       catch(err){
      
      alert("Da xay ra loi")
    }}
    fetchStarredBoard()
  } ,[state.page])
   
   const handClickNextBoard = ()=>{
    dispatch({
      type:"CHANGE_PAGE",
      payload:state.page+1
    })
   }
   const handClickPrevBoard = ()=>{
    dispatch({
      type:"CHANGE_PAGE",
      payload:state.page-1
    })
   }
    return (

        <div>
          {
            state.isLoading&&(<img src={Loading} alt='loading'></img>)
          }
           {
            !state.isLoading && (
              <StarredBorad board ={state.starredBoards} />
            )
           } 
           <p>Bạn đang xem trang {state.page+1}</p>
           <div>
              <button onClick={handClickPrevBoard}>Xem trang truoc</button>
           <button onClick={handClickNextBoard}>Xem trang sau</button>
           </div>
        </div>
    );
}

export default HomePage;
