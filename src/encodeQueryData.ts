// https://stackoverflow.com/questions/111529/how-to-create-query-parameters-in-javascript
export default function encodeQueryData(data:object) {
    const ret = [];
    for (let d in data) {
        // @ts-ignore
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
}