var utils = require('../app/global/js/Utils');


describe('Utils', function () {
    it('getMS()', function () {
        var ms = utils.getMS();

        expect(ms.oneSec).toBe(1000);
        expect(ms.oneMin).toBe(60000);
        expect(ms.oneHour).toBe(3600000);
        expect(ms.oneDay).toBe(86400000);
        expect(ms.oneYear).toBe(31536000000);
    });

    it('getUnitsFromMS() works for 2 days', function () {
        var ms = utils.getMS();
        var twoDays = ms.oneDay * 2;
        var fromMs = utils.getUnitsFromMS(twoDays);

        expect(fromMs.days).toBe(2);
        expect(fromMs.hours).toBe(2 * 24);
        expect(fromMs.mins).toBe(2 * 24 * 60);
        expect(fromMs.secs).toBe(2 * 24 * 60 * 60);
    });

    it('toPascalCase() works for 2 "hello world!"', function () {
        expect(utils.toPascalCase("hello world!")).toBe("Hello World!");
    });

    it('getMonthName() works when searching by id', function () {
        var fullNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var shortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        for (var i = 0; i < 11; i++) {
            expect(utils.getMonthName(i, true, false)).toBe(fullNames[i]);
            expect(utils.getMonthName(i, true, true)).toBe(shortNames[i]);
        }
    });
});