import axios from "axios";

export default function getTreeStructure(){
    console.log("in getTree")
    axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchNotes{
                body,
                title,
                id,
                updatedAt,
                createdAt
            }
            }`
        },
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }).then((response) =>{
        console.log("data data", response.data.data);
        return response.data.data;
    }).then(data =>{
        console.log(data);
        return data;
    });
}
