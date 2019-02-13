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
