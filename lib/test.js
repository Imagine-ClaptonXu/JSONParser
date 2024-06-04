// ===== 测试用例


const {
    log,
    ensure,
    equals,
} = require('./util.js')
const {
    jsonParser,
} = require('../main.js')


const test1 = function() {
    let s = `
        {
            "key":"value"
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value"
    }
    let condition = equals(input, expect)
    ensure(condition, 'test1')
}

const test2 = function() {
    let s = `
        {
            "key": "value",
            "num": -123.45,
            "boolean": false
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value",
        "num": -123.45,
        "boolean": false
    }
    let condition = equals(input, expect)
    ensure(condition, 'test2')
}

// 嵌套 object
const test3 = function() {
    let s = `
        {
            "key": "value",
            "num": -123.45,
            "boolean": false,
            "object": {
                "key": "value",
                "num": -123.45,
                "boolean": false
            }
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value",
        "num": -123.45,
        "boolean": false,
        "object": {
            "key": "value",
            "boolean": false,
            "num": -123.45
        }
    }
    let condition = equals(input, expect)
    ensure(condition, 'test3')
}

// array
const test4 = function() {
    let s = `
        {
            "key": "value",
            "num": -123.45,
            "boolean": false,
            "array": [
                1,
                "a"
            ]
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value",
        "num": -123.45,
        "boolean": false,
        "array": [
            1,
            "a"
        ]
    }
    let condition = equals(input, expect)
    ensure(condition, 'test4')
}

// 嵌套
const test5 = function() {
    let s = `
        {
            "key": "value",
            "num": -123.45,
            "boolean": false,
            "array": [
                1,
                "a",
                [
                    1,
                    "a",
                    true,
                    false,
                    null
                ]
            ]
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value",
        "num": -123.45,
        "boolean": false,
        "array": [
            1,
            "a",
            [
                1,
                "a",
                true,
                false,
                null
            ]
        ]
    }
    let condition = equals(input, expect)
    ensure(condition, 'test5')
}

// 复杂 json
const test6 = function() {
    let s = `
        {
            "key": "value",
            "num": -123.45,
            "boolean": false,
            "array": [
                1,
                "a",
                [
                    1,
                    "a",
                    true,
                    false,
                    null
                ],
                {
                    "key": "value",
                    "num": -123.45,
                    "boolean": false,
                    "arr": [
                        1,
                        "a",
                        true,
                        false,
                        null
                    ]
                }
            ]
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value",
        "num": -123.45,
        "boolean": false,
        "array": [
            1,
            "a",
            [
                1,
                "a",
                true,
                false,
                null
            ],
            {
                "key": "value",
                "num": -123.45,
                "boolean": false,
                "arr": [
                    1,
                    "a",
                    true,
                    false,
                    null
                ]
            }
        ]
    }
    let condition = equals(input, expect)
    ensure(condition, 'test6')
}

const test7 = function() {
    let s = `
        {
            "key": "value",
            "num": -123.45,
            "boolean": false,
            "array": [
                1,
                "a",
                [1, "a", true, false, null],
                {
                    "key": "value",
                    "num": -123.45,
                    "boolean": false,
                    "arr": [1, "a", true, false, null]
                }
            ],
            "o": {
                "t": ["t"],
                "-123.45": false,
                "cc": [
                    {
                        "t": ["t"],
                        "-123.45": false,
                        "k": {
                            "k": [
                                {"-123.45": -123.45}
                            ]
                        }
                    },
                    [
                        false, "-123.45",
                        [1]
                    ]
                ]
            }
        }
    `
    let input = jsonParser(s)
    let expect = {
        "key": "value",
        "num": -123.45,
        "boolean": false,
        "array": [
            1,
            "a",
            [1, "a", true, false, null,],
            {
                "key": "value",
                "num": -123.45,
                "boolean": false,
                "arr": [1, "a", true, false, null]
            }
        ],
        "o": {
            "t": ["t"],
            "-123.45": false,
            "cc": [
                {
                    "t": ["t"],
                    "-123.45": false,
                    "k": {
                        "k": [
                            {"-123.45": -123.45}
                        ]
                    }
                },
                [
                    false, "-123.45",
                    [1]
                ]
            ]
        }
    }
    let condition = equals(input, expect)
    ensure(condition, 'test7')
}

// 测试增加对 undefined 的支持，已支持
const test8 = function() {
    let s = `{
        "a": undefined
    }`
    let input = jsonParser(s)
    let expect = {
        "a": undefined
    }
    let condition = equals(input, expect)
    ensure(condition, 'test8')
}

// TODO: 测试增加对 尾逗号 的支持，暂未支持
const test9 = function() {
    let s = `{
        "a": "b",
    }`
    let input = jsonParser(s)
    let expect = {
        "a": "b",
    }
    let condition = equals(input, expect)
    ensure(condition, 'test9')
}

/*
cd ./lib
node test.js

*/
const __test = function() {
    test1()
    test2()
    test3()
    test4()
    test5()
    test6()
    test7()
    // test8()
    // test9()
}

__test()
