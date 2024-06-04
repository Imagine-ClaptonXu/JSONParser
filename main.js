// ===== JSON parser


const {
    log,
} = require('./lib/util.js')


const jsonParser = function(source) {
    // log('_____ in jsonParser _____')

    // 去掉测试用例中模版字符串开始的空格
    let text = source.trim()
    // 索引
    let index = 0
    // 当前字符，初始为 ''
    let code = ''
    // 转义
    let escapee = {
        '"': '"',
        '\\': '\\',
        '/': '/',
        'b': '\b',
        'f': '\f',
        'n': '\n',
        'r': '\r',
        't': '\t',
    }

    // 抛出异常，便于排查
    let error = function(message) {
        throw {
            type: 'SyntaxError',
            message,
            index,
            // 哪里出错了
            text: text.slice(index, index + 1),
            // 看前后的一个
            'test ± 1': text.slice(index-1, index + 2),
            // 多看一些
            'test - 10': text.slice(index - 10, index + 1),
            'test + 10': text.slice(index, index + 10),
        }
    }

    // 如果提供了参数 c，那么检验是否符合期望
    // 如果没有提供参数 c，往下走
    let next = function(c) {
        if (c && c !== code) {
            error(`error in next, Expected <${c}> instead of <${code}>`)
        }
        // 获取下一个字符。当没有下一个字符时，返回一个空字符串
        // log('next text', text, typeof text)
        code = text.charAt(index)
        // log('next code', `<${code}>`, typeof code)
        // log('code', code)
        index += 1
        return code
    }

    // 处理数字
    let number = function() {
        let number
        let string = ''
        if (code === '-') {
            string = '-'
            next('-')
        }
        while (code >= '0' && code <= '9') {
            string += code
            next()
        }
        if (code === '.') {
            string += '.'
            while (next() && code >= '0' && code <= '9') {
                string += code
            }
        }
        if (code === 'e' || code === 'E') {
            string += code
            next()
            if (code === '-' || code === '+') {
                string += code
                next()
            }
            while (code >= '0' && code <= '9') {
                string += code
                next()
            }
        }
        number = +string
        if (isNaN(number)) {
            error('error in number')
        } else {
            return number
        }
    }

    // 处理字符串
    let string = function() {
        let string = ''
        // 当解析字符串值时，我们必须找到 " 和 \ 字符。
        // log('string code', code)
        if (code === '"') {
            while (next()) {
                if (code === '"') {
                    next()
                    return string
                } else if (code === '\\') {
                    next()
                    if (typeof escapee[code] === 'string') {
                        string += escapee[code]
                    } else {
                        break
                    }
                } else {
                    string += code
                }
            }
        }
        error('error in string')
    }

    // 处理空白，跳过
    let white = function() {
        while (code && code <= ' ') {
            next()
        }
    }

    // 处理 true false null
    let special = function() {
        switch (code) {
            case 't':
                next('t')
                next('r')
                next('u')
                next('e')
                return true
            case 'f':
                next('f')
                next('a')
                next('l')
                next('s')
                next('e')
                return false
            case 'n':
                next('n')
                next('u')
                next('l')
                next('l')
                return null

            // 新增支持对 undefined 的处理
            case 'u':
                next('u')
                next('n')
                next('d')
                next('e')
                next('f')
                next('i')
                next('n')
                next('e')
                next('d')
                return undefined
        }
        error(`error in special, Unexpected <${code}>`)
    }

    // 处理数组
    let array = function() {
        // log('in array')
        let array = []
        // log('code', code)
        if (code === '[') {
            next('[')
            white()
            if (code === ']') {
                next(']')
                return array // 空数组
            }
            while (code) {
                array.push(parser())
                white()
                if (code === ']') {
                    next(']')
                    return array
                }
                white()
                next(',')
                white()
            }
        }
        error('error in array')
    }

    // 处理对象
    let object = function() {
        let key
        let object = {}
        if (code === '{') {
            next('{')
            white()
            if (code === '}') {
                next('}')
                return object // 空对象
            }
            while (code) {
                // log('object string ssss')
                key = string()
                white()
                next(':')
                white()
                object[key] = parser()
                white()
                if (code === '}') {
                    next('}')
                    return object
                }
                next(',')
                
                white()
            }
        }
        error('error in object')
    }

    // parser
    // 处理对象，数组，字符串，数字或一个词
    let parser = function() {
        // log('code111', `<${code}>`, index)
        switch (code) {
            case '{':
                return object()
            case '[':
                return array()
            case '"':
                return string()
            case '-':
                return number()
            default:
                return code >= '0' && code <= '9' ? number() : special()
        }
    }

    // 开始，获取第一个 code
    code = next()
    let result = parser()
    return result
}


module.exports = {
    jsonParser,
}
