import React from "react";
const fakeUser=[
    [
        'tunk_1_page_0',
        'tunk_2_page_0',
        'tunk_3_page_0',
        'tunk_4_page_0',
        'tunk_5_page_0',
        'tunk_6_page_0',
    ],
    [
        'tunk_1_page_1',
        'tunk_2_page_1',
        'tunk_3_page_1',
        'tunk_4_page_1',
        'tunk_5_page_1',
        'tunk_6_page_1',
    ],
    [
        'tunk_1_page_2',
        'tunk_2_page_2',
        'tunk_3_page_2',
        'tunk_4_page_2',
        'tunk_5_page_2',
        'tunk_6_page_2',
    ]
]
const getUser = (page)=>{
console.log("Getting start ",page);
    return new Promise((resolve,reject) => {  
        setTimeout(()=>{ 
                resolve(fakeUser[page])
            
         },3000) 
    })
}
class ClassComponet extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:0,
            users:[],
        }
    }

    render(){
        return(
            <>
                <h1>Class Component</h1>
                <h2>name : {this.props.name}</h2>
                <h3>page : {this.state.page}</h3>
                <button onClick={()=>{this.setState({page:this.state.page+1})}}>Next</button>
                <ul>
                    {
                        this.state.users.map(user=><h3>{user}</h3>)
                    }
                </ul>
            </>
        )
    }
    componentDidMount(){
        console.log("componentDidMount run");
        getUser(this.state.page).then(
            data=>{
                this.setState({
                  users:data
                })
            }
        )
        .catch(err=>{
                alert("Loi roi bn oi")
        })

    }
    componentDidUpdate(prevProps,prevState,snapshot){
        console.log("componentDidUpdate run");
        if(this.state.page !== prevState.page){
            getUser(this.state.page).then(
                data=>{
                    this.setState({
                      users:data
                    })
                }
            )
            .catch(err=>{
                    alert("Loi roi bn oi")
            })
        }
    }
    componentWillUnmount(){
        
    }
}
export default ClassComponet