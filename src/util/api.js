import axios from "axios";

export default function getTreeStructure(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchJsonType{
                path,
                isRoot,
                type,
                children
            }
            }`
        },
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }).then((response) =>{
        return response.data.data;
    })
}
