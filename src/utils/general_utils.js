export function objectToArray(object) {
    let result = [];
    for (const property in object) {
        result.push(object[property]);
    }
    return result;
}