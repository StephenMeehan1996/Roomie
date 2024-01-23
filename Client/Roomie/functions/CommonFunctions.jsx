
export const returnAdTypeText =  (type) => {
    switch (type) {
        case 1:
            return 'House Share'
            break;
        case 2:
            return 'House Rental'
            break;
        case 3:
            return 'Digs'
            break;
        default:
            return
            break;
    }
};

export const returnAdTypeNum =  (type) => {
    switch (type) {
        case 'House Share':
            return 1
            break;
        case 'House Rental':
            return 2
            break;
        case 'Digs':
            return 3
            break;
        default:
            return
            break;
    }
};

