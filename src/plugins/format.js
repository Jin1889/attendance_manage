// 导入dayjs用于格式化时间
const dayjs = require('dayjs')

exports.dateFormat = (date) => {
    if(date){
        return dayjs(date).format('YYYY-MM-DD')
    }
    return null
}

exports.timeFormat = (time) => {
    if(time){
        return dayjs(time).format('HH:mm:ss')
    }
    return null
}