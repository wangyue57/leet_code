/**
 * list <-> array
 */
function ListNode (val, next = null) {
  this.val = val
  this.next = next
}

function listToArr (list) {
  var res = []
  do {
    res.push(list.val)
    list = list.next
  } while (list)

  return res
}

function arrToList (arr) {
  var node = null

  for (var i = arr.length - 1; i >= 0; i--) {
    node = new ListNode(arr[i], node)
  }

  return node
}

/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * 示例:
 *  给定 nums = [2, 7, 11, 15], target = 9
 *  因为 nums[0] + nums[1] = 2 + 7 = 9
 *  所以返回 [0, 1]
 */
// 第一版
var twoSum = function (nums, target) {
  for (var i = 0, len = nums.length; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
// 第二版
var twoSum = function (nums, target) {
  var i, temp
  var cache = {}
  var len = nums.length

  for (i = 0; i < len; i++) {
    cache[nums[i]] = i
  }

  for (i = 0; i < len; i++) {
    temp = cache[target - nums[i]]

    if (temp && temp !== i) {
      return [i, temp]
    }
  }
}
// 第三版
var twoSum = function (nums, target) {
  var i, temp
  var cache = {}
  var len = nums.length

  for (i = 0; i < len; i++) {
    temp = cache[target - nums[i]]
    if (temp !== undefined) {
      return [temp, i]
    }

    cache[nums[i]] = i
  }
}

/**
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 示例：
 *  输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 *  输出：7 -> 0 -> 8
 *  原因：342 + 465 = 807
 */
var addTwoNumbers = function (l1, l2) {
  function ListNode (val) {
    this.val = val
    this.next = null
  }

  function foo (num1, num2, extra) {
    var sum = num1 + num2 + !!extra
    var exceed = sum >= 10

    return [exceed, exceed ? sum - 10 : sum]
  }

  var res, last, temp
  do {
    var [exceed, sum] = foo(l1 && l1.val, l2 && l2.val, exceed)
    temp = new ListNode(sum)

    if (!res) {
      res = last = temp
    } else {
      last.next = temp
      last = temp
    }

    l1 = l1 && l1.next
    l2 = l2 && l2.next
  } while (l1 || l2 || exceed)

  return res
}

/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * 示例 1:
 * 输入: 123
 * 输出: 321
 *
 * 示例 2:
 *  输入: -123
 *  输出: -321
 *
 * 示例 3:
 *  输入: 120
 *  输出: 21
 * 注意:
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。
 * 请根据这个假设，如果反转后整数溢出那么就返回 0。
 */
var reverse = function (x) {
  var negtive = x < 0
  if (negtive) {
    x = -x
  }

  let res = 0
  while (x >= 10) {
    res = res * 10 + (x % 10)
    x = Math.floor(x / 10)
  }
  res = res * 10 + (x % 10)
  num = negtive ? -res : res

  if (num < -2147483648 || num > 2147483647) {
    return 0
  }

  return num
}

/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false
  }
  let res = 0,
    temp = x
  while (temp >= 10) {
    res = res * 10 + (temp % 10)
    temp = Math.floor(temp / 10)
  }
  res = res * 10 + temp

  return res === x
}

/**
 * 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
 * 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，
 * 使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 说明：你不能倾斜容器，且 n 的值至少为 2。
 */
var maxArea = function (height) {
  var len = height.length,
    left = 0,
    right = len - 1
  var area = 0,
    temp, leftHeight, rightHeight

  while (left < right) {
    leftHeight = height[left]
    rightHeight = height[right]

    if (leftHeight > rightHeight) {
      temp = rightHeight * (right - left)
      right--
    } else {
      temp = leftHeight * (right - left)
      left++
    }

    area = Math.max(area, temp)
  }
  return area
}

/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 */
// 第一版
var longestCommonPrefix = function (strs) {
  var res = '',
    i = 0,
    len = strs.length,
    temp
  if (len === 0) {
    return res
  }

  while (temp = strs[0][i]) {
    for (var j = 1; j < len; j++) {
      if (strs[j][i] !== temp) {
        return res
      }
    }
    res += temp
    i++
  }
  return res
}
// 第二版
var longestCommonPrefix = function (strs) {
  var res = strs[0]
  if (!res) {
    return ''
  }
  for (var i = 1, len = strs.length; i < len; i++) {
    res = getCommon(res, strs[i])
    if (!res) {
      return res
    }
  }
  return res

  function getCommon (str1, str2) {
    var temp = '',
      i = 0,
      len1 = str1.length,
      len2 = str2.length

    while (i < len1 && i < len2) {
      if (str1[i] === str2[i]) {
        temp += str1[i]
      } else {
        return temp
      }
      i++
    }
    return temp
  }
}

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 */
var isValid = function (s) {
  var stack = [],
    map = {
      '(': ')',
      '[': ']',
      '{': '}'
    }

  for (var item of s) {
    if (item in map) {
      stack.push(item)
      continue
    }
    if (item !== map[stack.pop()]) {
      return false
    }
  }

  return stack.length === 0
}

/**
 * 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 */
var removeDuplicates = function (nums) {
  var cache = {}

  for (var i = 0; i < nums.length; i++) {
    var num = nums[i]

    if (cache[num]) {
      nums.splice(i--, 1)
    } else {
      cache[num] = 1
    }
  }

  return nums.length
}

/**
 * 设按照升序排序的数组在预先未知的某个点上进行了旋转。
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 * 你可以假设数组中不存在重复的元素。
 */
var search = function (nums, target) {
  var i, len = nums.length
  if (target < nums[0]) {
    for (i = len - 1; i >= 0; i--) {
      if (target === nums[i]) {
        return i
      }
      if (target > nums[i] || nums[i] < nums[i - 1]) {
        return -1
      }
    }
  } else {
    for (i = 0; i < len; i++) {
      if (target === nums[i]) {
        return i
      }
      if (target < nums[i] || nums[i] > nums[i + 1]) {
        return -1
      }
    }
  }
  return -1
}

/**
 * 全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute (nums) {
  var len = nums.length, res = []

  function run (index) {
    if (index === len - 1) {
      return res.push(nums.slice())
    }

    for (var i = index; i < len; i++) {
      swap(nums, i, index)
      run(index + 1)
      swap(nums, i, index)
    }
  }

  function swap (arr, i, j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  run(0)
  return res
}

/**
 * 最大子序合
 * @param {number[]} nums
 * @return {number}
 */
// 第一版
var maxSubArray = function (nums) {
  function getMax (arr) {
    var temp = 0, tempList = []
    for (var i = 0, len = arr.length; i < len; i++) {
      temp += arr[i]
      tempList.push(temp)
    }
    return Math.max(...tempList)
  }

  var res = getMax(nums)
  for (var i = 1, len = nums.length; i < len; i++) {
    res = Math.max(res, getMax(nums.slice(i)))
  }
  return res
}
// 第二版
var maxSubArray = function (nums) {
  var i, j, len = nums.length
  var temp, res = nums[0]

  for (i = 0; i < len; i++) {
    temp = 0
    for (j = i; j < len; j++) {
      temp += nums[j]
      if (temp > res) {
        res = temp
      }
    }
  }

  return res
}
// 第三版
var maxSubArray = function (nums) {
  var res = nums[0], temp = 0
  for (var i = 0, len = nums.length; i < len; i++) {
    temp += nums[i]

    if (temp > res) {
      res = temp
    }

    if (temp < 0) {
      temp = 0
    }
  }

  return res
}
// es6写法
var maxSubArray = function (nums) {
  var temp = 0

  return nums.reduce((res, num) => {
    temp = temp < 0 ? num : (temp + num)

    return Math.max(res, temp)
  }, nums[0])
}

/**
 * 摊平螺旋矩阵
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (matrix.length === 0) {
    return []
  }

  var rowDir = [0, 1, 0, -1], colDir = [1, 0, -1, 0]
  var currentRow = 0, currentCol = 0, currentDir = 0
  var res = [], visited = matrix.map(row => row.map(() => false))
  var rowNum = matrix.length, colNum = matrix[0].length, cellNum = rowNum * colNum

  while (res.length < cellNum) {
    res.push(matrix[currentRow][currentCol])
    visited[currentRow][currentCol] = true

    var nextRow = currentRow + rowDir[currentDir]
    var nextCol = currentCol + colDir[currentDir]
    if (outOfRange(nextRow, rowNum) || outOfRange(nextCol, colNum) || visited[nextRow][nextCol]) {
      currentDir = (currentDir + 1) % 4
    }

    currentRow += rowDir[currentDir]
    currentCol += colDir[currentDir]
  }

  function outOfRange (num, max) {
    return num < 0 || num >= max
  }

  return res
}

/**
 * 生成螺旋矩阵
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  var res = Array(n).fill(0).map(() => [])
  var i = 0, cellNum = n * n
  var rowIndex = 0, colIndex = 0, dir = 0
  var rowDir = [0, 1, 0, -1], colDir = [1, 0, -1, 0]

  while (i++ < cellNum) {
    res[rowIndex][colIndex] = i

    var nextRow = rowIndex + rowDir[dir]
    var nextCol = colIndex + colDir[dir]
    if (outOfRange(nextRow) || outOfRange(nextCol) || res[nextRow][nextCol]) {
      dir = (dir + 1) % 4
    }

    rowIndex += rowDir[dir]
    colIndex += colDir[dir]
  }

  function outOfRange (num) {
    return num < 0 || num >= n
  }

  return res
}

/**
 * 不同路径
 * 一个机器人位于一个 m x n 网格的左上角。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。
 * 问总共有多少条不同的路径？
 */
var uniquePaths = function (m, n) {
  var i, j, cache = [Array(n).fill(1)]

  for (i = 1; i < m; i++) {
    cache[i] = [1]
  }

  for (i = 1; i < m; i++) {
    for (j = 1; j < n; j++) {
      cache[i][j] = cache[i - 1][j] + cache[i][j - 1]
    }
  }

  return cache[m - 1][n - 1]
}

/**
 * 爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * @param {number} n
 * @return {number}
 */
// 第一版  递归 超时
var climbStairs = function (n) {
  if (n === 1) {
    return 1
  }

  if (n === 2) {
    return 2
  }

  return climbStairs(n - 1) + climbStairs(n - 2)
}
// 第二版
var climbStairs2 = function (n) {
  var cache = [1, 2]

  for (var i = 2; i < n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2]
  }

  return cache[n - 1]
}

/**
 * 全子集
 * @param {number[]} nums
 * @return {number[][]}
 */
// 第一版
var subsets = function (nums) {
  var res = []

  function count (arr, temp, start) {
    res.push(temp.slice())

    for (var i = start; i < arr.length; i++) {
      temp.push(nums[i])
      count(arr, temp, i + 1)
      temp.pop()
    }
  }

  count(nums, [], 0)
  return res
}
// 第二版
var subsets = function (nums) {
  var res = [[]]
  for (var num of nums) {
    for (var i = 1, len = res.length; i < len; i++) {
      res.push([...res[i], num])
    }
    res.push([num])
  }
  return res
}
// es6 写法
var subsets = function (nums) {
  return nums.reduce((res, num) => {
    for (var i = 1, len = res.length; i < len; i++) {
      res.push([...res[i], num])
    }
    res.push([num])
    return res
  }, [[]])
}
// 递归方式
var subsets = function (nums) {
  function getsub (arr) {
    if (arr.length === 1) {
      return [arr]
    }
    return combine(arr[0], getsub(arr.slice(1)))
  }

  function combine (num, arr) {
    var res = [[num]].concat(arr)
    for (var i = 1, len = res.length; i < len; i++) {
      res.push([...res[i], num])
    }
    return res
  }

  return getsub(nums).concat([[]])
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 第一版
var productExceptSelf = function (nums) {
  var len = nums.length, res = Array(len).fill(1)

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (i !== j) {
        res[j] *= nums[i]
      }
    }
  }
  return res
}
// 第二版
var productExceptSelf = function (nums) {
}

/**
 * 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  var start, end, len = nums.length, res = []
  for (var i = 0; i < len - 2; i++) {
    if (nums[i] === nums[i - 1]) {
      continue
    }
    start = i + 1
    end = len - 1
    while (start < end) {
      if (nums[start] + nums[end] + nums[i] === 0) {
        res.push([nums[start], nums[i], nums[end]])
        do {
          start++
        } while (nums[start] === nums[start - 1])
      }

      if (nums[start] + nums[end] + nums[i] < 0) {
        start++
      } else {
        end--
      }
    }
  }

  return res
}
