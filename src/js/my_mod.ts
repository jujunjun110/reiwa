export default class MyMod {
  message(): string {
    return 'hello'
  }

  extract_number(text: string): number | null {
    const res = text.match(/\d{1}/g)
    return res === null ? null : parseFloat(res.join(''))
  }

  fib(num: number): number {
    function fib_inner(counter: number, p1: number, p2: number): number {
      return counter === 0 ? p1 : fib_inner(counter - 1, p1 + p2, p1)
    }
    return fib_inner(num, 0, 1)
  }

  fib2(num: number): number {
    if (num === 0 || num === 1) {
      return num
    }

    const fibArray: Array<number> = [0, 1]
    for (let i = 2; i <= num; i++) {
      fibArray.push(fibArray[i - 1] + fibArray[i - 2])
    }
    return fibArray[num]
  }
}
