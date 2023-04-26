import {getDate} from "@/tools/Date";

// 本地存储
export function storageData(type){
    this.fileList.forEach(
        i => {
            i.id = Date.now().toString()
            i.timeStamp = getDate()
            i.measure_type = type
            localStorage.setItem(i.id, JSON.stringify(i))
        }
    )
    this.getStorage()
}
// 调用存储
export function getStorage(){
    let list = []
    for(var i = localStorage.length - 1; i >= 0; i--){
        let key = localStorage.key(i)
        list.push(JSON.parse(localStorage.getItem(key)))
    }
    this.current_data = list
}
// 清除数据
export function removeStorage(name){
    localStorage.removeItem(name)
    this.getStorage()
}
