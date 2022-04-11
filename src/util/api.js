import axios from "axios";

export function getTreeStructure(){
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

export function getConsultations(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchTutorships {
                    id,
                    teacherId,
                    description,
                    day,
                    hour,
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

export function getTeachers(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchTeachers {
                    id,
                    name,
                    lastName,
                    shorterName,
                    titleId,
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
export function getTitles(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchTitles {
                    id,
                    name,
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