import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = '청구 내역 (고객명: ${data.customer})\n';

    for (let perf of data.performances) {
        // 청구 내역을 출력한다.
        result += '   ${perf.play.name}: ${usd(thisAmmount/100)} ($perf.audience}석)\n';
    }

    result += '총액: ${usd(data.totalAmount/100)}\n';
    result += '적립 포인트: ${data.totalVolumeCredits}점\n';
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
    }

}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = '<h1>청구 내역 (고객명: ${data.customer})</h1>\n';
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for(let perf of data.performances) {
        result += ' <tr>'
    }

    return result;
}