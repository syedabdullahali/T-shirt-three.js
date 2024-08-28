const fillterAndDelete = (id:string)=>{
   return  (oldData: { data: { _id: string }[] } | undefined) => {
        if(!oldData) return 
        return {
          ...oldData,
          data: oldData.data.filter((item) => item._id !== id),
        };
}
}


const filterAndUpdate = (obj:{_id:string})=>{
    return  (oldData: { data: { _id: string }[] } | undefined) => {
        if(!oldData)  return 
        return {
          ...oldData,
          data: oldData.data.map((item) =>
            item._id == obj._id ? obj : item
          ),
        };
      }
}

const findAndAdd = (obj:{_id:string})=>{
  return  (oldData: { data: { _id: string }[],totalDocuments:number } | undefined) => {
      if(!oldData)  return 
      return {
        ...oldData,
        data: [...oldData.data,obj],
        totalDocuments:(oldData.totalDocuments||0) +1
      };
    }
}

export {fillterAndDelete,filterAndUpdate,findAndAdd}