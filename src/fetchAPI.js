
// This method fetches data from one ore more api's
// fetchAPI('https://...').then(data => {    })
export const fetchAPI=(linkList)=>{
  if(typeof linkList == "string"){
    linkList = [linkList]
  }
  const fetchList = linkList.map(elem => fetch(elem))
  let responseArr = []
  return Promise.all(fetchList).then( response => {
    response.map(elem=>{
      if(elem.status === 200){
        responseArr = responseArr.concat(elem.json())
      }
    })
    return Promise.all(responseArr)
  })
}
