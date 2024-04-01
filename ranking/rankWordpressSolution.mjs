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
        'WordPress na vlastním serveru',
        'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
    );

    solutionRank.color = '#21759b';

    solutionRank.goodFor({ webType }, ['presentation', 'blog']);
    solutionRank.badFor({ webType }, ['application']);

    if (pagesCount + productsCount + customFunctionsCount > 500) {
        // TODO: Add here link
        solutionRank.note('Pokud uvažujete o rozsáhlém webu na Wordpressu, zvažte JetPack plugin.');
    }

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
            possible: 5000,
        },
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 100,
        },
    );

    if (customFunctionsCount > 10) {
        solutionRank.note('Pro vyšší počet custom funkcí může být potřeba vývojář.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 50000 /* CZK */,
            possible: 1000 /* CZK */,
        },
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 5000 /* CZK */,
            possible: 100 /* CZK */,
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
            ideal: 40 /* % */ / 100,
            possible: 90 /* % */ / 100,
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

    

    solutionRank.balance({"fitAverage":11.8433537829192,"fitMin":-294.36060764418215,"fitMax":106.38252930087698});

    return solutionRank.calculate();
}
