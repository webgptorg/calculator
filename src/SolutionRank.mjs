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

    _pushBenefit(fit, reason) {
        if (fit === 0 && reason !== 'BALANCING') {
            // TODO: [🧠] Probbably accept notes this way
            throw new Error('fit must be non-zero');
        }
        this.benefits.push({ fit, reason });
    }

    note(note) {
        this.description += '\n\n' + note;
    }

    pro(reason) {
        return this._pushBenefit(1, reason);
    }

    con(reason) {
        return this._pushBenefit(-1, reason);
    }

    bigPro(reason) {
        return this._pushBenefit(3, reason);
    }

    bigCon(reason) {
        return this._pushBenefit(-3, reason);
    }

    smallPro(reason) {
        return this._pushBenefit(1 / 3, reason);
    }

    smallCon(reason) {
        return this._pushBenefit(-1 / 3, reason);
    }

    restrictiveCon(reason) {
        return this._pushBenefit(-9, reason);
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
            this._pushBenefit(100, `Dobrá volba pro ${webTypeToMessage(webType, 2)}`);
        }
    }

    badFor(partialPrefecences, webTypes) {
        const [key, value] = this._extractPartialPrefecencesKeyValuePair(partialPrefecences);

        if (key !== 'webType') {
            throw new Error('Only webType allowed');
        }

        const webType = value;

        if (webTypes.includes(webType)) {
            this._pushBenefit(-100, `Nevhodná volba pro ${webTypeToMessage(webType, 2)}`);
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

            fit = -Infinity; // <- Note: User wants something that system can not provide, so it’s a huge con, this will be limited bellow
        } else {
            // Note: The ideal and possible values sets the parabolic scale for the fit as follows:
            //
            //               🟪                 <- [ fit  = 5 ]
            //          🟪       🟪
            //       🟪            🟪
            //    🟪                  🟪
            //   🟪                    🟪       <- [ fit = 0 ]
            //  -1    -0.5    0    0.5    1    1.5
            //  ―――――――――――――――――――――――――――――――――――
            //                ↑           ↑
            //             [ideal]    [possible]

            fit = 1 - Math.abs((value - ideal) / (possible - ideal));

            // Example:
            //  1) possible: 10, ideal: 5, value: 7
            //     1 - Math.abs((7 - 5) / (10 - 5)) = 0.6
        }

        /*
        // Note: Limiting fit to not give too much weight to one preference
        if (fit > 5) {
            console.warn('--> Fit is limited to 5');
            fit = 5;
        } else if (fit < -5) {
            fit = -5;
        }
        */

        let k = 0.62;
        let fitWord;
        if (fit >= Math.pow(k, 1)) {
            fitWord = 'Naprosto ideální';
        } else if (fit >= Math.pow(k, 2)) {
            fitWord = 'Ideální';
        } else if (fit >= Math.pow(k, 3)) {
            fitWord = 'Dobrý';
        } else {
            fitWord = 'Ucházející';
        }

        // <- TODO: Maybe same pattern for cons

        if (fit === 0) {
            return;
        } else if (key === 'pagesCount') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} počet stránek`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `Příliš mnoho stránek`);
            } else if (value < ideal) {
                return this._pushBenefit(fit, `Zbytečně složité řešení na vámi požadovaný počet stránek`);
            }
        } else if (key === 'productsCount') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} počet produktů`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `Příliš mnoho produktů`);
            } else if (value < ideal) {
                return this._pushBenefit(fit, `Zbytečně složité řešení na vámi požadovaný počet produktů`);
            }
        } else if (key === 'updatesDaysPeriod') {
            // [🆙]
            /*
            if (fit>0) {
                return this.pushBenefit(fit,`${fitWord} frekvence aktualizací`);
            } else if (value > ideal) {
                return this.pushBenefit(fit,`Příliš mnoho `);
            } else if (value < ideal) {
                return this._pushBenefit(fit, ``);
            }
            */
        } else if (key === 'customFunctionsCount') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} počet vlastních funkcí`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `Požadujete příliš mnoho vlastních funkcí`);
            } else if (value < ideal) {
                return this._pushBenefit(fit, `Zbytečně složité řešení na vámi požadovaný počet vlastních funkcí`);
            }
        } else if (key === 'budgetUpfront') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} rozpočet na začátek`);
            } else if (value < ideal) {
                return this._pushBenefit(fit, `Neadekvátní rozpočet na začátek`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `S vaším rozpočtem dokážete zvolit lepší řešení`);
            }
        } else if (key === 'budgetPerMonth') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} rozpočet na měsíc`);
            } else if (value < ideal) {
                return this._pushBenefit(fit, `Neadekvátní rozpočet na měsíc`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `S vaším rozpočtem na měsíc dokážete zvolit lepší řešení`);
            }
        } else if (key === 'daysToDeadline') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} čas na dokončení`);
            } else if (value < ideal) {
                return this._pushBenefit(fit, `Moc krátký čas na dokončení`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `V rámci času na dokončení dokážete zvolit propracovanější řešení`);
            }
        } else if (key === 'levelOfControl') {
            if (fit > 0) {
                return this._pushBenefit(fit, `${fitWord} míra přizpůsobení`);
            } else if (value > ideal) {
                return this._pushBenefit(fit, `Mnoho věcí nebudete mít pod kontrolou`);
            } else if (value < ideal) {
                return this._pushBenefit(
                    fit,
                    `Zvolte víc šablonové řešení, pokud nepotřebujete mít věci tolik pod kontrolou`,
                );
            }
        } else {
            throw new Error(`Unknown preference: ${key}`);
        }
    }

    balance(stats) {
        // return this._pushBenefit(fit, 'BALANCING');

        if (this.stats) {
            // !!> throw new Error(`${this.title} is balanced twice.`);
        }

        this.stats = stats;
    }

    get fit() {
        return this.benefits.reduce((sum, { fit }) => sum + fit, 0);
    }

    get percentile() {
        if (!this.stats) {
            // !!> throw new Error(`${this.title} is not balanced.`);
            return 0;
        }

        const { fit } = this;
        const { fitAverage, fitMin, fitMax } = this.stats;

        // TODO: !!! Definitelly decide between these two strategies:
        const percentile = (this.fit - fitAverage) / (fitMax - fitMin);
        // const percentile = (this.fit - fitMin) / (fitMax - fitMin);

        /*
        if (this.title === 'Wordpress.com Hosted') {
            console.log(JSON.stringify([fitMin, fit, fitMax]));
        }
        */

        return percentile;
    }

    get pros() {
        // TODO: [1] DRY
        return this.benefits
            .filter(({ fit }) => fit > 0)
            .sort((a, b) => b.fit - a.fit)
            .map(({ fit, reason }) => {
                if (!((reason === 'BALANCING' || fit < 0.2) /*  <- [📉] */)) {
                    return `${reason}<i class="debug">(${
                        Math.round(fit * 10) / 10 /* <- [♎] Should be in one place */
                    })</i>`;
                } else {
                    return `<span class="debug">${reason}<i>(${
                        Math.round(fit * 10) / 10 /* <- [♎] Should be in one place */
                    })</i></span>`;
                }
            });
    }

    get cons() {
        // TODO: [1] DRY
        return this.benefits
            .filter(({ fit }) => fit < 0)
            .sort((a, b) => a.fit - b.fit)
            .map(({ fit, reason }) => {
                if (!((reason === 'BALANCING' || fit > 0.2) /*  <- [📉] */)) {
                    return `${reason}<i class="debug">(${
                        Math.round(fit * 10) / 10 /* <- [♎] Should be in one place */
                    })</i>`;
                } else {
                    return `<span class="debug">${reason}<i>(${
                        Math.round(fit * 10) / 10 /* <- [♎] Should be in one place */
                    })</i></span>`;
                }
            });
    }

    calculate() {
        if (this._preferencesToBeRanked.size > 0 && !reportedCalculateWarningFor.has(this.title)) {
            console.warn(
                `For ${this.title} there are ${this._preferencesToBeRanked.size} preferences not ranked: ${Array.from(
                    this._preferencesToBeRanked,
                ).join(', ')}`,
            );
            reportedCalculateWarningFor.add(this.title);
        }

        // Note: Materializing the calculated values for performance reasons
        const { title, description, color, fit, percentile, pros, cons } = this;

        const solutionRank = this;

        return {
            title,
            description,
            color,
            fit,
            percentile,
            pros,
            cons,
            reopen() {
                delete solutionRank.stats;
                return solutionRank;
            },
        };
    }
}

/**
 * @singleton
 */
let reportedCalculateWarningFor = new Set();

/**
 * Note: [📉] If the pro or con is very small, it’s not worth mentioning
 */
