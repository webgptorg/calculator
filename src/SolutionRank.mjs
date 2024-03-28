import { webTypeToMessage } from './other/webTypeToMessage.mjs';

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

    pushBenefit(fit, reason) {
        if (fit === 0) {
            // TODO: [🧠] Probbably accept notes this way
            throw new Error('fit must be non-zero');
        }
        this.benefits.push({ fit, reason });
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

    neutralFor(partialPrefecences, webTypes) {
        // Note: Do nothing
    }

    rankPrefecence(partialPrefecences, prefecences) {
        const [key, value] = this._extractPartialPrefecencesKeyValuePair(partialPrefecences);
        const { ideal, possible } = prefecences;

        if (key === 'webType') {
            throw new Error(`For ${this.title} can not rank webType, use goodFor or badFor instead`);
        }

        /*/
        // Note: Keep for testing one parameter in isolation
        if (key !== 'pagesCount') {
            return;
        }
        /**/

        // console.log(this.title, key, value, { ideal, possible });

        let fit;

        if (ideal === possible) {
            if (ideal !== 0) {
                throw new Error(
                    `For ${this.title} ideal and possible can not have same value (${ideal}), only 0 is allowed`,
                );
            }

            if (value === 0) {
                return;
            }

            fit = -Infinity; // <- Note: User wants something that system can not provide, so it’s a huge con
        } else {
            // Note: The ideal and possible values sets the scale for the fit as follows:
            //     | 1.5    1    0.5    0   -0.5    -1
            //     |    ―――――――――――――――――――――――
            //     |        ↑           ↑
            //     |     [ideal]    [possible]

            fit = (value - possible) / (ideal - possible);
        }

        // Note: If the pro or con is very small, it’s not worth mentioning
        if (Math.abs(fit) < 0.2) {
            return;
        }

        // Note: Limiting fit to not give too much weight to one preference
        if (fit > 5) {
            fit = 5;
        } else if (fit < -5) {
            fit = -5;
        }

        let fitWord;
        if (fit > 2) {
            fitWord = 'Naprosto ideální';
        } else if (fit > 1) {
            fitWord = 'Ideální';
        } else if (fit > 0.5) {
            fitWord = 'Dobrý';
        } else if (fit > 0) {
            fitWord = 'Ucházející';
        }
        // TODO: Maybe same pattern for cons

        if (false) {
        } else if (key === 'pagesCount') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} počet stránek`);
            } else if (value > possible) {
                return this.pushBenefit(fit, `Příliš mnoho stránek`);
            }
        } else if (key === 'productsCount') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} počet produktů`);
            } else if (value > possible) {
                return this.pushBenefit(fit, `Příliš mnoho produktů`);
            }
        } else if (key === 'updatesDaysPeriod') {
            // [🆙]
            /*
            if (fit>0) {
                return this.pushBenefit(fit,`${fitWord} frekvence aktualizací`);
            } else if (value > possible) {
                return this.pushBenefit(fit,`Příliš mnoho `);
            }
            */
        } else if (key === 'customFunctionsCount') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} počet vlastních funkcí`);
            } else if (value > possible) {
                return this.pushBenefit(fit, `Příliš mnoho vlastních funkcí`);
            }
        } else if (key === 'budgetUpfront') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} rozpočet na začátek`);
            } else if (value < possible) {
                return this.pushBenefit(fit, `Neadekvátní rozpočet na začátek`);
            }
        } else if (key === 'budgetPerMonth') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} rozpočet na měsíc`);
            } else if (value < possible) {
                return this.pushBenefit(fit, `Neadekvátní rozpočet na měsíc`);
            }
        } else if (key === 'daysToDeadline') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} čas na dokončení`);
            } else if (value < possible) {
                return this.pushBenefit(fit, `Moc krátký čas na dokončení`);
            }
        } else if (key === 'levelOfControl') {
            if (fit > 0) {
                return this.pushBenefit(fit, `${fitWord} míra přizpůsobení`);
            } else if (value > possible) {
                return this.pushBenefit(fit, `Mnoho věcí nebudete mít pod kontrolou`);
            }
        } else {
            throw new Error(`Unknown preference: ${key}`);
        }
    }

    balance(fit) {
        return this.pushBenefit(fit, 'balance' /* <- !!! */);
    }

    get fit() {
        return this.benefits.reduce((sum, { fit }) => sum + fit, 0);
    }

    get pros() {
        return this.benefits
            .filter((benefit) => benefit.fit > 0)
            .sort((a, b) => b.fit - a.fit)
            .map(
                (benefit) =>
                    benefit.reason +
                    `<i class="debug">(+${Math.round(benefit.fit * 10) / 10 /* <- [♎] Should be in one place */})</i>`,
            );
    }

    get cons() {
        return this.benefits
            .filter((benefit) => benefit.fit < 0)
            .sort((a, b) => a.fit - b.fit)
            .map(
                (benefit) =>
                    benefit.reason +
                    `<i class="debug">(${Math.round(benefit.fit * 10) / 10 /* <- [♎] Should be in one place */})</i>`,
            );
    }

    calculate() {
        if (this._preferencesToBeRanked.size > 0) {
            console.warn(
                `For ${this.title} there are ${this._preferencesToBeRanked.size} preferences not ranked: ${Array.from(
                    this._preferencesToBeRanked,
                ).join(', ')}`,
            );
        }

        return this;
    }
}
