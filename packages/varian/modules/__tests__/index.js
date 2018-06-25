import {
    byteLength,
    minLen,
    maxLen,
    minByteLen,
    maxByteLen,
    hasChinese,
    isPureChinese,
    isCommonName,
    isName,
    isAlpha,
    isEmail,
    isSNMPCom,
    isInteger,
    isRange,
    isIntRange,
    minInt,
    maxInt,
    strongPassword,
    include,
    exclude,
    beginWith,
    endWith,
    groupOf,
    punycodeToASCII,
    minDomainLen,
    maxDomainLen,
    isViewName,
    isZoneName,
    isRRName,
    isDomainName,
    isMAC,
    isDUID,
    isIPv4,
    isIPv6,
} from '../index';

test('test {byteLength}', () => {
    expect(byteLength('123', 3)).toBeTruthy();
    expect(byteLength('13狗', 5)).toBeTruthy();
});

test('test {minLen}', () => {
    expect(minLen('wasabi', 5)).toBeTruthy();
    expect(minLen('wasa', 5)).toBeFalsy();
});

test('test {maxLen}', () => {
    expect(maxLen('wasabi', 6)).toBeTruthy();
    expect(maxLen('wasabi', 5)).toBeFalsy();
});

test('test {minByteLen}', () => {
    expect(minByteLen('芥末', 6)).toBeTruthy();
    expect(minByteLen('芥末', 7)).toBeFalsy();
});

test('test {maxByteLen}', () => {
    expect(maxByteLen('神抽狗', 9)).toBeTruthy();
    expect(maxByteLen('神抽狗', 8)).toBeFalsy();
});

test('test {hasChinese}', () => {
    expect(hasChinese('Joe加')).toBeTruthy();
    expect(hasChinese('wo-')).toBeFalsy();
});

test('test {isPureChinese}', () => {
    expect(isPureChinese('中文')).toBeTruthy();
    expect(isPureChinese('那边f')).toBeFalsy();
});

test('test {isCommonName}', () => {
    expect(isCommonName('狗')).toBeTruthy();
    expect(isCommonName('wo-*')).toBeFalsy();
});

test('test {isName}', () => {
    expect(isName('Joe')).toBeTruthy();
    expect(isName('wo-')).toBeFalsy();
});

test('test {isAlpha}', () => {
    expect(isAlpha('a3')).toBeTruthy();
    expect(isAlpha('25')).toBeFalsy();
});

test('test {isEmail}', () => {
    expect(isEmail('a@b')).toBeTruthy();
    expect(isEmail('2b')).toBeFalsy();
});

test('test {isSNMPCom}', () => {
    expect(isSNMPCom('lakdjf')).toBeTruthy();
    var com = '';
    for (let i = 0; i< 256; i++) {
        com += 'a';
    };
    expect(isSNMPCom(com)).toBeFalsy();
});

test('test {isInteger}', () => {
    expect(isInteger(32)).toBeTruthy();
    expect(isInteger(0x32)).toBeTruthy();
    expect(isInteger('24')).toBeTruthy();
    expect(isInteger('2b')).toBeFalsy();
});

test('test {isRange}', () => {
    expect(isRange(27, 1, 28)).toBeTruthy();
    expect(isRange(22.33, 1, 28)).toBeTruthy();
    expect(isRange(0, 1, 28)).toBeFalsy();
});

test('test {isIntRange}', () => {
    expect(isIntRange(27, 1, 28)).toBeTruthy();
    expect(isIntRange(22.33, 1, 28)).toBeFalsy();
    expect(isIntRange(0, 1, 28)).toBeFalsy();
});

test('test {minInt}', () => {
    expect(minInt(20, 20)).toBeTruthy();
    expect(minInt(20, 2)).toBeTruthy();
    expect(minInt(-20, -20)).toBeTruthy();
    expect(minInt(0, 1)).toBeFalsy();
});

test('test {maxInt}', () => {
    expect(maxInt(20, 20)).toBeTruthy();
    expect(maxInt(2, 20)).toBeTruthy();
    expect(maxInt(-20, -20)).toBeTruthy();
    expect(maxInt(1, 0)).toBeFalsy();
});

test('test {strongPassword}', () => {
    expect(strongPassword('ABcd12345')).toBeTruthy();
    expect(strongPassword('Abc123')).toBeFalsy();
    expect(strongPassword('abcd1234')).toBeFalsy();
    expect(strongPassword('ABCD1234')).toBeFalsy();
});

test('test {include}', () => {
    expect(include('Abc123', '123')).toBeTruthy();
    expect(include('Abc123', 'd')).toBeFalsy();
});

test('test {exclude}', () => {
    expect(exclude('Abc123', 'd')).toBeTruthy();
    expect(exclude('Abc123', '123')).toBeFalsy();
});

test('test {beginWith}', () => {
    expect(beginWith('Abc123', 'A')).toBeTruthy();
    expect(beginWith('Abc123', 'a')).toBeFalsy();
});

test('test {endWith}', () => {
    expect(endWith('Abc123', '3')).toBeTruthy();
    expect(endWith('Abc123', '4')).toBeFalsy();
});

test('test {groupOf}', () => {
    let group1 = [1,2,3,4];
    let group2 = [1,2,3,'a'];
    expect(groupOf(group1, isInteger)).toBeTruthy();
    expect(groupOf(group2, isInteger)).toBeFalsy();
});

test('test {punycodeToASCII}', () => {
    // 'no test';
});

test('test {minDomainLen}', () => {
    expect(minDomainLen('abc', 2)).toBeTruthy();
    // 狗 == 'xn--l5x'
    expect(minDomainLen('狗', 8)).toBeFalsy();
});

test('test {maxDomainLen}', () => {
    expect(maxDomainLen('abcd', 5)).toBeTruthy();
    expect(maxDomainLen('狗', 6)).toBeFalsy();
});

test('test {isViewName}', () => {
    expect(isViewName('abcd')).toBeTruthy();
    expect(isViewName('狗')).toBeFalsy();
});

test('test {isZoneName}', () => {
    expect(isZoneName('abcd')).toBeTruthy();
    expect(isZoneName('狗')).toBeFalsy();
});

test('test {isRRName}', () => {
    expect(isRRName('abcd')).toBeTruthy();
    expect(isRRName('狗')).toBeFalsy();
});

test('test {isDomainName}', () => {
    expect(isDomainName('abcd')).toBeTruthy();
    expect(isDomainName('狗')).toBeFalsy();
});

test('test {isMAC}', () => {
    expect(isMAC('a1:a2:a3:a4:a5:a6')).toBeTruthy();
    expect(isMAC('a:a:a:a:a:a')).toBeTruthy();
    expect(isMAC('a1-a2-a3-a4-a5-a6')).toBeTruthy();
    expect(isMAC('a1:b2-c3:d4-e5:f6')).toBeFalsy();
});

test('test {isDUID}', () => {
    expect(isDUID('fa:fa:fa:fa:fa:ca:ca:ca')).toBeTruthy();
    expect(isDUID('fa:fa:fa:fa:fa:fa:fa:fa:fa:fa')).toBeTruthy();
    expect(isDUID('aksdjf')).toBeFalsy();
});

test('test {isIPv4}', () => {
    expect(isIPv4('1.2.3.4')).toBeTruthy();
    expect(isIPv4('0.2.3.4')).toBeFalsy();
    expect(isIPv4('256.2.3.4')).toBeFalsy();
    expect(isIPv4('25.288.3.4')).toBeFalsy();
});

test('test {isIPv6}', () => {
    expect(isIPv6('fe80::1')).toBeTruthy();
    expect(isIPv6('f3bb::a::c', 5)).toBeFalsy();
});
