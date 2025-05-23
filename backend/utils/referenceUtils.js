
exports.uniqid = (prefix = '', size = 4) => {
    
    const randomPart = Math.random().toString(36).substring(2, 2 + size); // "a1bz"
    const timestampPart = Date.now().toString(36);// "1a2b3c"
    return prefix + '-' + randomPart + timestampPart;// "prefix-a1bz-1a2b3c"
    
}