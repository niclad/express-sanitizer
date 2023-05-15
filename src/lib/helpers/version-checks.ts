import { version } from 'process';

interface Version {
    major: string;
    minor: string;
    patch: string;
}

const EARLIEST_SUPPORTED_VERSION: Version = {
    major: "17",
    minor: "0",
    patch: "29"
};

/**
 * Check the current Node version against the earliest supported version.
 * @returns True if the current Node version is supported, false otherwise
 */
function checkCompatibility(): boolean {
    const currVer: Version = getCurrVer();
    return (
        EARLIEST_SUPPORTED_VERSION.major <= currVer.major &&
        EARLIEST_SUPPORTED_VERSION.minor <= currVer.minor &&
        EARLIEST_SUPPORTED_VERSION.patch <= currVer.patch
    );    
}

/**
 * Get the current Node version as a Version object.
 * @returns The current Node version as a Version object
 */
function getCurrVer(): Version {
    const verRegex: RegExp = /^v(?<major>\d*).(?<minor>\d*).(?<patch>\d*)$/;
    const currVer = verRegex.exec(version);

    if (!currVer || !currVer.groups) {
        throw new Error('Unable to parse Node version');
    }

    console.log(currVer);

    return (currVer.groups as unknown) as Version;
}

export { checkCompatibility };
