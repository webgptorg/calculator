import { SolutionRank } from '../src/SolutionRank.mjs';

/**
 * Rank the suitability of the WordPress solution based on user preferences.
 */
export function rankWordpressSolution(prefecences) {
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

    const solutionRank = new SolutionRank(
        'Self-hosted WordPress',
        'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
    );

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1000,
            possible: 10000,
        },
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 1000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 30,
        },
    );

    if (customFunctionsCount > 10) {
        solutionRank.note('Pro vyšší počet custom funkcí může být potřeba vývojář.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 30000,
            possible: 7000,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 1000,
            possible: 100,
        },
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 90,
            possible: 7,
        },
    );

    if (daysToDeadline < 30) {
        solutionRank.con('Krátká doba na deadline může vést ke kompromisům v kvalitě a funkcionalitě.');
    }

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 0.4,
            possible: 0.6,
        },
    );

    if (levelOfControl > 0.5) {
        solutionRank.con(
            'Uživatelé vyžadující vysokou míru kontroly nad designem mohou narazit na omezení WordPress témat a pluginů.',
        );
    } else {
        solutionRank.pro(
            'Wordpress poskytuje dostatečnou flexibilitu pro většinu uživatelů s mírnějšími požadavky na kontrolu.',
        );
    }

    

    solutionRank.balance(-32.71330071720851);

    return solutionRank.calculate();
}
