
export function timeToWord(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const sec = Math.floor(seconds - hours * 3600 - minutes * 60)

    let word = ''
    if (hours != 0) {
        word += hours + 'hrs '
    }
    if (minutes != 0) {
        word += minutes + 'mins '
    }

    if (sec != 0) {
        word += sec + 'secs'
    }

    return word
}


export function dateTimeString(unixMilliseconds: number) {
    // Create a new Date object with the Unix timestamp in milliseconds
    const date = new Date(unixMilliseconds);

    // Extract the day, month, and year from the date object
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();


    // Construct the date string in the desired format
    const dateString = `${day} ${month} ${year}`;

    return dateString;
}


export function getAgeFromTimestamp(milliseconds: number) {
    const now = Date.now();
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Accounting for leap years

    const ageMilliseconds = now - milliseconds;
    const ageYears = Math.floor(ageMilliseconds / millisecondsPerYear);

    return ageYears;
}


export function dateTimeToInputFormat(milliseconds: number){
    const dateTime = new Date(milliseconds)
    const year = dateTime.getFullYear()
    const months = dateTime.getMonth() + 1    // because it Jan is at 0 index
    const days = dateTime.getDate()

    let dateTimeString = year.toString()
    if(months < 10){
        dateTimeString += '-0' + months
    }else{
        dateTimeString += '-' + months
    }

    if(days < 10){
        dateTimeString += '-0' + days
    }else{
        dateTimeString += '-' + days
    }

    return dateTimeString

}
