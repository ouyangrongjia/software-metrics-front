// 信息读取器
export function fileReaders(file){
    let reader = new FileReader()
    reader.readAsText(file,'UTF-8')
    reader.onload = (e) => {
        const data = e.currentTarget.result
        var s = data.toString()
        console.log(s)
        return s
    }
}
