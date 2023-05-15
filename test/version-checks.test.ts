import { checkCompatibility } from "../src/lib/helpers/version-checks";

describe("version-checks", () => {
    test('should return true if the versions are compatible', () => {
        expect(checkCompatibility()).toBe(true);
    });
});