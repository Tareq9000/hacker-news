export const convertTime=time=>{
  const date = new Date(time)
  const now = new Date()
  const day =  now.getUTCDate()+30 - date.getUTCDate()
  const hours = now.getUTCHours() - date.getUTCHours()
  const minutes = now.getUTCMinutes - date.getUTCMinutes()
  let newTime = ""
  if(day != 0){
    newTime = day+" days ago"
  }else if(hours != 0){
    newTime = day+" hours ago"
  }else {
    newTime = minutes+" minutes ago"
  }
  return newTime;
}
export const getLink=url=>{
  if(url != null){
    const splited = url.split("/")
    return "( "+splited[2]+" )"
  }
  return ""
}
export const getLinkUrl=url=>{
  if(url != null){
    const splited = url.split("/")
    return splited[0]+"//"+splited[2]
  }
  return ""
}