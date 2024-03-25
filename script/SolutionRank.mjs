import { webTypeToMessage } from '../data/other/webTypeToMessage.mjs';

export class SolutionRank {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.benefits = [];

        this._preferencesToBeRanked = new Set([
            'webType',
            'pagesCount',
            'productsCount',
            // [🆙] 'updatesDaysPeriod',
            'customFunctionsCount',
            'budgetUpfront',
            'budgetPerMonth',
            'daysToDeadline',
            'levelOfControl',
        ]);
    }

    note(note) {
        this.description += '\n\n' + note;
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

    _extractPartialPrefecencesKeyValuePair(partialPrefecences) {
        let keyValuePairs = Object.entries(partialPrefecences);

        if (keyValuePairs.length === 0) {
            throw new Error('No partialPrefecences provided');
        }

        if (keyValuePairs.length > 1) {
            throw new Error('Only one partialPrefecences allowed');
        }

        const [key, value] = keyValuePairs[0];

        this._preferencesToBeRanked.delete(key);

        return [key, value];
    }

    goodFor(partialPrefecences, webTypes) {
        const [key, value] = this._extractPartialPrefecencesKeyValuePair(partialPrefecences);

        if (key !== 'webType') {
            throw new Error('Only webType allowed');
        }

        const webType = value;

        if (webTypes.includes(webType)) {
            this.pro(`Dobrá volba pro ${webTypeToMessage(webType, 2)}`);
        }
    }

    badFor(partialPrefecences, webTypes) {
        const [key, value] = this._extractPartialPrefecencesKeyValuePair(partialPrefecences);

        if (key !== 'webType') {
            throw new Error('Only webType allowed');
        }

        const webType = value;

        if (webTypes.includes(webType)) {
            this.con(`Nevhodná volba pro ${webTypeToMessage(webType, 2)}`);
        }
    }

    rankPrefecence(partialPrefecences, prefecences) {
        const [key, value] = this._extractPartialPrefecencesKeyValuePair(partialPrefecences);
        const { ideal, possible } = prefecences;

        // TODO: !!! Use also big and small cons and pros in some range

        if (false) {
        } else if (key === 'pagesCount') {
            if (value <= ideal) {
                return this.pro(`Ideální počet stránek`);
            } else if (value > possible) {
                return this.con(`Příliš mnoho stránek`);
            }
        } else if (key === 'productsCount') {
            if (value <= ideal) {
                return this.pro(`Ideální počet produktů`);
            } else if (value > possible) {
                return this.con(`Příliš mnoho produktů`);
            }
        } else if (key === 'updatesDaysPeriod') {
            // [🆙]
            /*
            if (value <= ideal) {
                return this.pro(`Ideální frekvence aktualizací`);
            } else if (value > possible) {
                return this.con(`Příliš mnoho `);
            }
            */
        } else if (key === 'customFunctionsCount') {
            if (value <= ideal) {
                return this.pro(`Ideální počet vlastních funkcí`);
            } else if (value > possible) {
                return this.con(`Příliš mnoho vlastních funkcí`);
            }
        } else if (key === 'budgetUpfront') {
            if (value >= ideal) {
                return this.pro(`Ideální rozpočet na začátek`);
            } else if (value < possible) {
                return this.con(`Neadekvátní rozpočet na začátek`);
            }
        } else if (key === 'budgetPerMonth') {
            if (value >= ideal) {
                return this.pro(`Ideální rozpočet na měsíc`);
            } else if (value < possible) {
                return this.con(`Neadekvátní rozpočet na měsíc`);
            }
        } else if (key === 'daysToDeadline') {
            if (value >= ideal) {
                return this.pro(`Ideální čas na dokončení`);
            } else if (value < possible) {
                return this.con(`Moc krátký čas na dokončení`);
            }
        } else if (key === 'levelOfControl') {
            if (value <= ideal) {
                return this.pro(`Ideální míra přizpůsobení`);
            } else if (value > possible) {
                return this.con(`Mnoho věcí nebudete mít pod kontrolou`);
            }
        } else {
            throw new Error(`Unknown preference: ${key}`);
        }
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

    calculate() {
        if (this._preferencesToBeRanked.size > 0) {
            console.warn(
                `There are ${this._preferencesToBeRanked.size} preferences not ranked: ${Array.from(
                    this._preferencesToBeRanked,
                ).join(', ')}`,
            );
        }

        return this;
    }
}
