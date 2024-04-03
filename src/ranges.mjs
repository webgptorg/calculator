export const RANGES = {
    pagesCount: {
        min: 1,
        max: 10000,
        step: 1,
        defaultValue: 50,
    },
    productsCount: {
        min: 0,
        max: 100000,
        step: 1,
        defaultValue: 50,
    },
    /*
    updateDaysPeriod: {
        min: 1,
        max: 400,
        step: 1,
        value: 30,
    },
    */
    customFunctionsCount: {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0,
    },
    budgetUpfront: {
        min: 0 /* CZK */,
        max: 3000000 /* CZK */,
        step: 1,
        defaultValue: 10000,
    },
    budgetPerMonth: {
        min: 0 /* CZK */,
        max: 100000 /* CZK */,
        step: 1,
        defaultValue: 1000,
    },
    daysToDeadline: {
        min: -1 /* days */,
        max: 1095 /* days */,
        step: 1,
        defaultValue: 30,
    },
    levelOfControl: {
        min: 0 /* * 100% */,
        max: 1 /* * 100% */,
        step: 0.01,
        defaultValue: 0.5,
    },
};
