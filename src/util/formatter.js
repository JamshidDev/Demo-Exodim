const interDateFormatter = function (time) {
  let newFormatDate = new Date(time);
  return newFormatDate;
};

const outDateFormatter = function (time) {
  let newFormatDate = new Date(time).toLocaleDateString("en-CA");
  return newFormatDate;
};

const textDateFormat = function (time){
  let textFormat = new Date(time).toLocaleDateString("en-GB")
  return textFormat
}
const arrowDateFormat = function (time){
    let date = new Date(time)
    let year = date.getFullYear()
    let month = (date.getMonth()+1)<10? `0${date.getMonth()+1}` : date.getMonth()+1;
    let day = date.getDate()<10? `0${date.getDate()}` : date.getDate()
    return `${day}-${month}-${year}`
}

export default { interDateFormatter, outDateFormatter,textDateFormat,arrowDateFormat };


