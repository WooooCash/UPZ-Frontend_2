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
                    typed
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
                fetchTeachersWithTutorshipsAndPlans {
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

export function getPlans(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchPlans {
                    id,
                    teacherId,
                    day,
                    hour,
                    amount,
                    classroomId,
                    subjectId,
                    subjectType,
                    teacherId
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

export function getSubjects(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchSubjects {
                    id,
                    name,
                    shorterName
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

export function getClassrooms(){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchClassrooms {
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

export function getGroups(args){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchGroups (typeOfStudies:"${args.typeOfStudies}", 
					major:"${args.major}", 
					degree:"${args.degree}", 
					specialityId:${args.specialityId}, 
					semester:${args.semester}){
						attributes
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

export function getPlansForGroups(args){
    return axios({url:"https://upz-graphql.herokuapp.com/graphql",
    
        method:'post',
        data:{
            query: `query {
                fetchPlanToExistingGroup (typeOfStudies:"${args.typeOfStudies}", 
					major:"${args.major}", 
					degree:"${args.degree}", 
					specialityId:${args.specialityId}, 
					semester:${args.semester},
					groups:${args.groups}){
						id,
						teacherId,
						day,
						hour,
						amount,
						classroomId,
						subjectId,
						subjectType,
						teacherId
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
