`import { describe, expect, test, bench, beforeEach, afterEach, beforeAll, afterAll } from "vitest";`

- describe 你可以在当前上下文中定义一个新系列，可嵌套； ---> describe('name', () => { test(), it() })
- test 的别名为 it ---> test('name', () => {}) 定义了一组关于测试期望的方法。它接收测试名称和一个含有测试期望的函数。
- expect 断言
- beforeEach 在当前上下文中的每个测试运行之前被调用。
- afterEach 在当前上下文中的每个测试运行之后被调用。
- beforeAll 在开始运行当前上下文中的所有测试之前被调用一次
- afterAll 在当前上下文中运行所有测试后被调用一次
