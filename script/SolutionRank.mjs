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

        return this;
    }

    get fit() {
        return this.benefits.reduce((acc, benefit) => {
            return acc * Math.pow(2, benefit.fitExponent);
        }, 1);
    }

    get pros() {
        // TODO: !!! Sort by fitExponent
        return this.benefits.filter((benefit) => benefit.fitExponent > 0).map((benefit) => benefit.reason);
    }

    get cons() {
        // TODO: !!! Sort by fitExponent
        return this.benefits.filter((benefit) => benefit.fitExponent < 0).map((benefit) => benefit.reason);
    }
}
