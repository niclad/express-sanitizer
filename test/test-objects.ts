interface User {
    username: string;
    password?: string;
    blahblah?: boolean;
    friends?: User | User[];
}

const testUserA: User = {
    username: 'Peter Parker',
    password: 'spiderman15cool!',
    blahblah: false
};
const testUserB: User = {
    username: 'Miles Morales',
    password: 'imcoolersp1d3rm4n!!',
    blahblah: true
};
const testUserC: User = {
    username: 'g4nke',
    password: 'websh00terz',
    friends: testUserB,
};
const testUserD: User = {
    username: 'octavius',
    password: 'octopiiRawsum',
    friends: [{ ...testUserB }, { ...testUserA }, { ...testUserC }],
};
const userArr = [
    testUserA,
    testUserB,
];

export {
    testUserA,
    testUserB,
    testUserC,
    testUserD,
    userArr,    
}