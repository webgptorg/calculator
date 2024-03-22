export class SolutionRank {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.benefits = [];
    }

    pushBenefit(fitExponent, reason) {
        if (fitExponent === 0) {
            // TODO: [🧠] Probbably accept notes this way
            throw new Error('fitExponent must be non-zero');
        }
        this.benefits.push({ fitExponent, reason });
    }

    pro(reason) {
        return this.pushBenefit(1, reason);
    }

    con(reason) {
        return this.pushBenefit(-1, reason);
    }

    bigPro(reason) {
        return this.pushBenefit(3, reason);
    }

    bigCon(reason) {
        return this.pushBenefit(-3, reason);
    }

    smallPro(reason) {
        return this.pushBenefit(1 / 3, reason);
    }

    smallCon(reason) {
        return this.pushBenefit(-1 / 3, reason);
    }

    restrictiveCon(reason) {
        return this.pushBenefit(-9, reason);
    }

    get fit() {
        return this.benefits.reduce((acc, benefit) => {
            return acc * Math.pow(2, benefit.fitExponent);
        }, 1);
    }

    get pros() {
        return this.benefits
            .filter((benefit) => benefit.fitExponent > 0)
            .sort((a, b) => b.fitExponent - a.fitExponent)
            .map((benefit) => benefit.reason + `<i class="debug">(${benefit.fitExponent})</i>`);
    }

    get cons() {
        return this.benefits
            .filter((benefit) => benefit.fitExponent < 0)
            .sort((a, b) => a.fitExponent - b.fitExponent)
            .map((benefit) => benefit.reason + `<i class="debug">(${benefit.fitExponent})</i>`);
    }
}
