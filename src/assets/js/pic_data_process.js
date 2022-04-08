function subPic(data, seg_len) {
    let len = data.length
    let num = Math.floor(len/seg_len) + 1
    let current = 0
    let data_seg = []
    for (let i=0; i<num; i++) {
        data_seg.push(data.substr(current,seg_len))
        current += seg_len
    }

    return data_seg
}

function concatPic(data) {
    return data.join('')
}

export { subPic, concatPic }