export const formatDate = (dateString) => {
    let date = new Date(dateString);
    let dateStr = date.toDateString().slice(4);
    return dateStr.slice(0,3) + ',' + dateStr.slice(3);
}

export const timeSinceUpload = (dateString) => {
    let uploadDate = new Date(dateString);
    let presentDate = new Date;
    let returnString = '';
    let num = 0;
    if ((presentDate.getFullYear() - created_at.getFullYear()) > 0){
        num = (presentDate.getFullYear() - created_at.getFullYear());
        returnString = `${num} year`;
    } else if ((presentDate.getMonth() - created_at.getMonth()) > 0 ){
        num = (presentDate.getMonth() - created_at.getMonth());
        returnString = `${num} month`;
    } else if ((presentDate.getDate() - created_at.getDate()) > 0) {
        num = (presentDate.getDate() - created_at.getDate());
        returnString = `${num} day`;
    } else if ((presentDate.getHours() - created_at.getHours()) > 0) {
        num = (presentDate.getHours() - created_at.getHours());
        returnString = `${num} hour`;
    } else if ((presentDate.getMinutes() - created_at.getMinutes()) > 0) {
        num = (presentDate.getMinutes() - created_at.getMinutes());
        returnString = `${num} minute`;
    } else{
        num = (presentDate.getSeconds() - created_at.getSeconds());
        returnString = `${num} second`;
    }

    if (num === 1){
        return returnString + "ago";
    } else{
        return returnString + "s ago";
    }
};