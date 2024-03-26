import { SolutionRank } from '../script/SolutionRank.mjs';

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

    // Balance between pros and cons for each preference

    if (['presentation', 'blog'].includes(webType)) {
        solutionRank.pro('Ideální pro prezentace a blogy, díky velkému množství šablon a pluginů.');
    } else if (webType === 'eshop') {
        solutionRank.pro('Možnost vytvoření eshopu s pluginem WooCommerce.');
        solutionRank.con('WooCommerce vyžaduje další nastavení a rozšíření pro plně funkční eshop.');
    } else if (webType === 'application') {
        solutionRank.con('Pro vytvoření složitějších aplikací nemusí být WordPress nejvhodnějším řešením.');
    }

    solutionRank.rankPrefecence(
        { pagesCount },
        {
            ideal: 1000,
            possible: 10000,
        }
    );

    solutionRank.rankPrefecence(
        { productsCount },
        {
            ideal: 0,
            possible: 1000,
        }
    );

    solutionRank.rankPrefecence(
        { customFunctionsCount },
        {
            ideal: 0,
            possible: 30,
        }
    );

    if (customFunctionsCount > 10) {
        solutionRank.note('Pro vyšší počet custom funkcí může být potřeba vývojář.');
    }

    solutionRank.rankPrefecence(
        { budgetUpfront },
        {
            ideal: 30000,
            possible: 7000,
        }
    );

    solutionRank.rankPrefecence(
        { budgetPerMonth },
        {
            ideal: 1000,
            possible: 100,
        }
    );

    solutionRank.rankPrefecence(
        { daysToDeadline },
        {
            ideal: 90,
            possible: 7,
        }
    );

    if (daysToDeadline < 30) {
        solutionRank.con('Krátká doba na deadline může vést ke kompromisům v kvalitě a funkcionalitě.');
    }

    solutionRank.rankPrefecence(
        { levelOfControl },
        {
            ideal: 0.4,
            possible: 0.6,
        }
    );

    if (levelOfControl > 0.5) {
        solutionRank.con('Uživatelé vyžadující vysokou míru kontroly nad designem mohou narazit na omezení WordPress témat a pluginů.');
    } else {
        solutionRank.pro('Wordpress poskytuje dostatečnou flexibilitu pro většinu uživatelů s mírnějšími požadavky na kontrolu.');
    }

    return solutionRank.calculate();
}