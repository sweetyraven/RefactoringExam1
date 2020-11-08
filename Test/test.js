const statement = require("../state");
const invoice = require('../invoice.json');
const plays = require('../plays.json');

test("출력 검사", () => {
    const expected = '청구 내역 (고객명: BigCo)\n   Hamlet: $650.00 (55석)\n총액: $650.00\n적립 포인트: 25점\n';
    expect(expected).toEqual(statement(invoice, plays));
})