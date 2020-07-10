
class PerformanceCalculator{
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
    let result = 0;
    switch (this.play.type) {
        case "tregedy": // 비극
            result = 40000;
            if (this.performance.audience > 30) {
                result += 1000 * (this.performance.audience - 30);
            }
            break;
        case "comedy": //희극
            result = 30000;
            if (this.performance.audience > 20) {
                result += 10000 + 500 * (this.performance.audience - 20);
            }
            result += 300 * this.performance.audience;
            break;
        default:
            throw new Error('알 수 없는 장르: ${playFor(this.performance).type}');
    }
    return result;
    }

    get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" == playFor(this.performance).type)
        result += Math.floor(this.performance.audience / 5);
    return result;
}

}

class TregedyCalculator extends PerformanceCalculator {

}

class ComedyCalculator extends PerformanceCalculator {
    
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type)
    {
        case "tregedy": return new TregedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error('알 수 없는 장르: ${aPlay.type');
    }
}

function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    statementData.totalAmount = totalAmount(statementData);
    return statementData;

    
function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    
    return result;
}


function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
}
}
