import { version } from 'process';

const EARLIEST_SUPPORTED_VERSION: string = 'v17.0.29';

class Version {
  private _major: string;
  get major(): number {
    return parseInt(this._major);
  }

  private _minor: string;
  get minor(): number {
    return parseInt(this._minor);
  }

  private _patch: string;
  get patch(): number {
    return parseInt(this._patch);
  }

  constructor(ver?: string) {
    const tempVer: { major: string, minor: string, patch: string } = ver ? this.parseVersion(ver) : this.parseVersion(version);
    this._major = tempVer.major;
    this._minor = tempVer.minor;
    this._patch = tempVer.patch;
  }

  parseVersion(ver: string): { major: string, minor: string, patch: string } {
    const verRegex: RegExp = /^v(?<major>\d*).(?<minor>\d*).(?<patch>\d*)$/;
    const currVer = verRegex.exec(ver);

    if (!currVer || !currVer.groups) {
      throw new Error('Unable to parse Node version');
    }

    return currVer.groups as unknown as { major: string, minor: string, patch: string };
  }

  isCompatible(currVer: string) {
    const tempVer: Version = new Version(currVer);
    return this.compare(tempVer);
  }

  compare(ver: Version): boolean {
    if (this.major !== ver.major) {
      return this.major < ver.major;
    }

    if (this.minor !== ver.minor) {
      return this.minor < ver.minor;
    }

    return this.patch < ver.patch;
  }
}

function checkCompatibility(): boolean {
  const earliestVer: Version = new Version(EARLIEST_SUPPORTED_VERSION);
  return earliestVer.isCompatible(version);
}

export { checkCompatibility };
