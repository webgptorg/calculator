import { SolutionRank } from '../script/SolutionRank.mjs';

export function rankWordpressSolution({
    webType,
    pagesCount,
    productsCount,
    updatesDaysPeriod,
    customFunctionsCount,
    budgetUpfront,
    budgetPerMonth,
    daysToDeadline,
    levelOfControl,
}) {
    const solutionRank = new SolutionRank(
        'Self-hosted Wordpress',
        'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
    );

    if (customFunctionsCount < 5) {
        solutionRank.pushBenefit(1, 'Pro základní úkoly má WordPress velké množství pluginů');
    } else if (customFunctionsCount > 10) {
        solutionRank.pushBenefit(-1, 'Ve WordPressu budete muset pro každou vlastní funkci psát nebo hledat plugin');
    }

    if (pagesCount + productsCount > 5000) {
        solutionRank.pushBenefit(-1, 'WordPress není vhodný pro tak velké množství obsahu');
    }

    if (levelOfControl > 0.9) {
        solutionRank.pushBenefit(-0.5, 'Pokud chcete mít dokonalou kontrolu, není WordPress nejlepší volba');
    }

    if (daysToDeadline < 7) {
        solutionRank.pushBenefit(-0.5, 'Za týden nestihnete vytvořit web na WordPressu');
    }

    return solutionRank;

    /*
        !!! pros: ['Nejrozšířenější open-source CMS na světě', 'Mnoho šablon a pluginů'],
        !!! cons: ['Potřeba spravovat hosting', 'Potřeba spravovat aktualizace'],
        */
}
