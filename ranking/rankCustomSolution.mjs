import { SolutionRank } from '../src/SolutionRank.mjs';
import { RANGES } from '../src/ranges.mjs';

/**
 * Rank the suitability of the Custom solution based on user preferences.
 */
export function rankCustomSolution(prefecences) {
    const {
        webType,
        pagesCount,
        productsCount,
        customFunctionsCount,
        budgetUpfront,
        budgetPerMonth,
        daysToDeadline,
        levelOfControl,
    } = prefecences;

    const solutionRank = new SolutionRank('Vlastní řešení', '');

    solutionRank.color = '#cccccc';

    // TODO: Maybe put to some reusable util
    let completityLevel = 'lowpage'; // <- 'lowpage', 'highpage', 'dynamic', 'complex'

    if (pagesCount + productsCount > 10) {
        completityLevel = 'highpage';
    } else if (['blog'].includes(webType) || pagesCount + productsCount > 100) {
        completityLevel = 'dynamic';
    } else if (['eshop', 'application'].includes(webType) || customFunctionsCount > 0) {
        completityLevel = 'complex';
    }

    if (completityLevel !== 'lowpage') {
        solutionRank.note('Zvažte využití frameworků a knihoven pro zrychlení vývoje.');
    } else {
        solutionRank.note('Zvažte využit statické generátory pro zrychlení vývoje.');
    }

    solutionRank.bigPro('Naprostá flexibilita a kontrola nad designem a funkcionalitou.');
    solutionRank.bigCon('Vysoké náklady na vývoj a údržbu.');

    /*
    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 10,
            possible: 100,
        },
    );
    */

    /*
    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 50,
            possible: 5000,
        },
    );
    */

    /*
    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 5,
            possible: 50,
        },
    );
    */

    if (completityLevel === 'lowpage') {
        solutionRank.note(
            `Váš web nevypadá na příliš složitý, pokud se vydáte cestou jednoduchého statického webu, můžete ušetřit spoustu peněz, času a starostí.`,
        );

        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 20000 /* CZK */,
                possible: 1000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 120 /* CZK */,
                possible: 25 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { daysToDeadline },
            {
                ideal: 60 /* days */,
                possible: 7 /* days */,
            },
        );
    } else if (completityLevel === 'highpage') {
        solutionRank.note(
            `Váš web vypadá složitě, zvažte využití nějakého CMS (např. Wordpressu) nebo frameworku, abyste ušetřili čas a peníze.`,
        );

        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 80000 /* CZK */,
                possible: 30000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 1000 /* CZK */,
                possible: 200 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { daysToDeadline },
            {
                ideal: 90 /* days */,
                possible: 14 /* days */,
            },
        );
    }

    if (completityLevel === 'dynamic') {
        solutionRank.note(
            `Váš web vypadá složitě, zvažte využití nějakého frameworku nebo CMS, abyste ušetřili čas a peníze.`,
        );

        solutionRank.rankPrefecence(
            { budgetUpfront },
            {
                ideal: 120000 /* CZK */,
                possible: 50000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 1000 /* CZK */,
                possible: 200 /* CZK */,
            },
        );

        solutionRank.rankImportantPrefecence(
            { daysToDeadline },
            {
                ideal: 120 /* days */,
                possible: 30 /* days */,
            },
        );
    }

    if (completityLevel === 'complex') {
        solutionRank.note(
            `Váš web vypadá velmi složitě, pečlivě promyslete zadání i dodavatele, abyste se vyhnuli vývoji zbytečných funkcí. Zároveň doporučujeme důkladnou analýzu před samotným vývojem.`,
        );

        solutionRank.rankImportantPrefecence(
            { budgetUpfront },
            {
                ideal: RANGES.budgetUpfront.max,
                possible: 300000 /* CZK */,
            },
        );

        solutionRank.rankPrefecence(
            { budgetPerMonth },
            {
                ideal: 50000 /* CZK */,
                possible: 2000 /* CZK */,
            },
        );

        solutionRank.rankImportantPrefecence(
            { daysToDeadline },
            {
                ideal: 300 /* days */,
                possible: 90 /* days */,
            },
        );
    }

    solutionRank.rankImportantPrefecence(
        { levelOfControl },
        {
            ideal: 90 /* % */ / 100,
            possible: 100 /* % */ / 100,
        },
    );

    solutionRank.balance({ fitAverage: -24.12954105105858, fitMin: -1137.7406395233365, fitMax: 2.7229396825396823 });

    solutionRank.balance({ fitAverage: -16.447903125489397, fitMin: -821.1019424031776, fitMax: 2.7229396825396823 });

    return solutionRank.calculate();
}
