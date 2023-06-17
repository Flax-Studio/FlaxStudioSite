
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
