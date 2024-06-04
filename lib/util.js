// ===== 辅助函数


const log = console.log.bind(console)

// 测试函数
const ensure = function(condition, message='') {
    if (condition) {
        log('√√√ 测试成功', message)
    } else {
        log('xxx 测试失败', message)
    }
}

const isArray = function(s) {
    return Object.prototype.toString.call(s) === '[object Array]'
}

const isObject = function(s) {
    return Object.prototype.toString.call(s) === '[object Object]'
}

const arrayEquals = function(a, b) {
    if (isArray(a) && isArray(b)) {
        // 长度相等
        if (a.length === b.length) {
            for (let i = 0; i < a.length; i++) {
                let e = a[i]
                let e2 = b[i]
                if (isArray(e) && isArray(e2)) {
                    let res = arrayEquals(e, e2)
                    if (!res) {
                        return false
                    }
                } else if (isObject(e) && isObject(e2)) {
                    var res = objectEquals(e, e2)
                    if (!res) {
                        return false
                    }
                } else if (e != e2) {
                    return false
                }
            }
            return true
        }
    }
    return false
}

const objectEquals = function(a, b) {
    var aKeyList = Object.keys(a)
    var bKeyList = Object.keys(b)
    if (isObject(a) && isObject(b)) {
        if (aKeyList.length === bKeyList.length) {
            for (let i = 0; i < aKeyList.length; i+=1) {
                let keyA = aKeyList[i]
                let valueA = a[keyA]
                let valueB = b[keyA]
                if (isObject(valueA) && isObject(valueB)) {
                    let res = objectEquals(valueA, valueB)
                    if (!res) {
                        return false
                    }
                } else if (isArray(valueA) && isArray(valueB)) {
                    let res = arrayEquals(valueA, valueB)
                    if (!res) {
                        return false
                    }
                } else if (valueA != valueB) {
                    return false
                }
            }
            return true
        }
    }
    return false
}

// 比较 a 和 b 是否相等
const equals = function(a, b) {
    if (isArray(a) && isArray(b)) {
        return arrayEquals(a, b)
    } else if (isObject(a) && isObject(b)) {
        return objectEquals(a, b)
    } else {
        return a === b
    }
}


module.exports = {
    log,
    ensure,
    equals,
}
