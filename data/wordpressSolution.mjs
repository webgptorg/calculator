export function wordpressSolution({
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
    let fit = 1;

    if (pagesCount > 100000) {
        fit *= 0.5;
    }

    if (levelOfControl > 0.9) {
        fit *= 0.9;
    }

    return {
        fit,
        title: 'Self-hosted Wordpress',
        description: 'Využijte nejrozšířenější open-source CMS na světě pro vytvoření svých webových stránek.',
        pros: ['Nejrozšířenější open-source CMS na světě', 'Mnoho šablon a pluginů'],
        cons: ['Potřeba spravovat hosting', 'Potřeba spravovat aktualizace'],
    };
}
