### import functions

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
    } from '../index'



### 验证基础函数库

    describe 'Validation tools', =>


- byteLength 返回字符串utf8字节数

      it 'should get utf8 byteLength of string', =>

        expect byteLength('123')
          .toEqual 3

        expect byteLength('13狗')
          .toEqual 5


- 返回字符串的punycode编码

      it 'should return punycode encode string', =>

        expect punycodeToASCII('芥末')
          .toEqual 'xn--7pvo52d'

        expect punycodeToASCII('域名工程中心。网址。')
          .toEqual 'xn--fiqz6l2rdj3hlqclt7d.xn--ses554g.'

- 以...开始

      it 'should start with', =>

        expect beginWith 'file facl', 'file'
          .toBeTruthy()

- 以...结束

      it 'should end with', =>

        expect endWith 'file facl', 'acl'
          .toBeTruthy()

- 集合

      it 'should be a group of', =>

        list = [ 1, 2, 3, 4 ]
        expect groupOf(list, (n) => n > 0)
          .toBeTruthy()


### 常规验证规则

    describe 'Common Validators', =>


- 验证超过长度时返回true

      it 'should match maxLength', =>

        expect maxLen('Jonathan', 8)
          .toBeTruthy()

        expect maxLen('Jonathan', 7)
          .toBeFalsy()



- 验证长度不足时返回true

      it 'should match minLength', =>

        expect minLen('citizen', 7)
          .toBeTruthy()

        expect minLen('citizen', 8)
          .toBeFalsy()



- 验证字符串占用utf8字节长度是否超过限定范围

      it 'should be in byte length', =>

        expect minByteLen('世界杯', 9)
          .toBeTruthy()

        expect minByteLen('世界杯', 10)
          .toBeFalsy()

        expect maxByteLen('>梅西<', 8)
          .toBeTruthy()

        expect maxByteLen('>梅西<', 7)
          .toBeFalsy()


- 验证是否包含有中文字符

      it 'should include chinese character', =>

        expect hasChinese('I love wasabi')
          .toBeFalsy()

        expect hasChinese('芥末')
          .toBeTruthy()


- 验证字符全部为中文

      it 'should be all in chinese', =>

        expect isPureChinese('夜阑卧听风吹雨')
          .toBeTruthy()

        expect isPureChinese('铁马冰河入梦来！')
          .toBeFalsy()

- 验证通用名称，可以为数字字母下划线中文

      it 'should be common name, include number, lodash, letter, chinese', =>

        expect isCommonName '114'
          .toBeTruthy()

        expect isCommonName 'Joe'
          .toBeTruthy()

        expect isCommonName '__line__'
          .toBeTruthy()

        expect isCommonName '假虞灭虢'
          .toBeTruthy()

        expect isCommonName 'dash-style'
          .toBeFalsy()

        expect isCommonName 'named.exe'
          .toBeFalsy()

允许的注册名称，可以为数字字母下划线

      it 'should be a valid name', =>

        expect isName '__autoload'
          .toBeTruthy()

        expect isName 'route53'
          .toBeTruthy()

        expect isName '213'
          .toBeTruthy()

        expect isName 'Coach'
          .toBeTruthy()

        expect isName 'LifeCoach'
          .toBeTruthy()

        expect isName 'Life Coach'
          .toBeFalsy()

- alphanumeric, 同name，不能以数字开头

      it 'should be alphanumeric, can not start with number', =>

        expect isAlpha 'dns53'
          .toBeTruthy()

        expect isAlpha '53dns'
          .toBeFalsy()


- 是否是合法的电子邮件名称

电子邮件名称只要饱含`@`, 并且 @ 后需要符合域名规则

      it 'should be a valid email format', =>

        expect isEmail 'joe@nabla'
          .toBeTruthy()

        expect isEmail 'mario@互联.网'
          .toBeTruthy()

        expect isEmail 'sc'
          .toBeFalsy()

        expect isEmail '555@-666'
          .toBeFalsy()


- snmp只读团体名称

长度不超过255字节

      it 'should be snmp read community', =>

        expect isSNMPCom 'wulake, oba'
          .toBeTruthy()

        expect isSNMPCom '三墩缓存'
          .toBeTruthy()

        s = ''
        s += '递归转发' for i in [0...99]
        expect isSNMPCom s
          .toBeFalsy()


- 密码验证

密码要足够健壮
长度需要在8字节以上
必须包含一个大些字母，一个小写字母，一个数字

      it 'should be a strong password', =>

        expect strongPassword 'ABcd1234'
          .toBeTruthy()

        expect strongPassword '互联网Ab3'
          .toBeTruthy()

        expect strongPassword 'ABcd123'
          .toBeFalsy()

        expect strongPassword 'abcd1234'
          .toBeFalsy()

        expect strongPassword 'ABCD1234'
          .toBeFalsy()


### DNS相关验证

    describe 'DNS Validators', =>

- 域名长度验证

域名长度，记录的长度
如果饱含`IDN`，长度为转为`ascii`之后的长度

      it 'should be valid domain name length', =>

        expect minDomainLen('Jonathan-Coachman', 10)
          .toBeTruthy()

        expect minDomainLen('互联。中国', 10)
          .toBeTruthy()

        expect maxDomainLen('互联网域名和互联网解析', 63)
          .toBeTruthy()

        expect maxDomainLen('互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网互联网', 63)
          .toBeTruthy()

        expect maxDomainLen('互联网能够链接各个地区和不同的人们加快了信息交流', 63)
          .toBeFalsy()


- 视图名称验证

包含 字母 数字 _ - 中文
长度不超过32字符
不能以-开头结尾
不能饱含`*`, `__`

      it 'should be valid view name', =>

        expect isViewName 'dynamic'
          .toBeTruthy()

        expect isViewName '东南地区'
          .toBeTruthy()

        expect isViewName 'nc-'
          .toBeFalsy()

        expect isViewName '-nc'
          .toBeFalsy()

        expect isViewName 'nc__'
          .toBeFalsy()

        expect isViewName 'n*c'
          .toBeFalsy()

        expect isViewName 'abcdefghijkomnopqrstuvwxyz0123456789'
          .toBeFalsy()


- 区名称验证

区名称punycode长度不超过191
可以是'@'
不能以-开头结尾
不能饱含 `*`, `__`, `..`, `xn--`
以.分割，每段都需要满足记录名称

      it 'should be a zone name', =>

        expect isZoneName('zdns.cn')
          .toBeTruthy()

        expect isZoneName('@')
          .toBeTruthy()

        expect isZoneName('hi-china')
          .toBeTruthy()

        expect isZoneName('@.cn')
          .toBeFalsy()

        expect isZoneName('hi-')
          .toBeFalsy()

        expect isZoneName('-joe')
          .toBeFalsy()

        expect isZoneName('*.baidu.com')
          .toBeFalsy()

        expect isZoneName('__nx.z.cn')
          .toBeFalsy()

        expect isZoneName('tombstone..cn')
          .toBeFalsy()

        expect isZoneName('xn--53a1.z.cn')
          .toBeFalsy()


- 记录名称验证

记录名称 可以是 * . *.
不能饱含..
punycode长度不超过63
字符只能是 数字 字母 下划线 连接线 中文

      it 'should be a rr name', =>

        expect isRRName 'joe'
          .toBeTruthy()

        expect isRRName '*'
          .toBeTruthy()

        expect isRRName '*f'
          .toBeFalsy()

        expect isRRName 'c..cc'
          .toBeFalsy()


- 域名验证

域名名称 punycode长度不超过254
不能以 - 开头结尾
不能饱含 * __ .. xn--
以 . 分割，每段都需要符合rr规则

      it 'should be a domain name', =>

        expect isDomainName 'jokerman'
          .toBeTruthy()

        expect isDomainName 'you-do-not-need-jquery-underscore.com'
          .toBeTruthy()

        expect isDomainName '-acer.com'
          .toBeFalsy()

        expect isDomainName 'acer.com-'
          .toBeFalsy()

        expect isDomainName 'ds*.joe'
          .toBeFalsy()

        expect isDomainName 'xn--cc.joe'
          .toBeFalsy()

        expect isDomainName 'ac..joe'
          .toBeFalsy()


### DHCP相关验证

    describe 'DHCP Validators', =>

验证MAC地址

6段1-2位16进制字符，以`:`或`-`分割

      it 'should be MAC', =>

        expect isMAC('3:2f:c:17:06:b')
          .toBeTruthy()

        expect isMAC('3-2f-c-17-06-b')
          .toBeTruthy()

        expect isMAC('3:2f:c-17:06:b')
          .toBeFalsy()

        expect isMAC('3:2f:c:17:06')
          .toBeFalsy()


验证DUID

同MAC，分段位6-17段变长

      it 'should be DUID', =>

        expect isDUID '0:1:2:3:4:5:6:7:8:9'
          .toBeTruthy()

        expect isDUID '0-1-2-3-4-5-6-7-8-9-a-b-c-d-e-f'
          .toBeTruthy()

        expect isDUID '0:1:2:3:4:5:6-7:8:9'
          .toBeFalsy()

        expect isDUID '0:1:2:3:4'
          .toBeFalsy()

        expect isDUID '0:1:2:3:4:5:6:7:8:9:a:b:c:d:e:f:10:11'
          .toBeFalsy()


验证IPv4地址

      it 'should be IPv4 address', =>

        expect isIPv4 '0.0.0.0'
          .toBeTruthy()

        expect isIPv4 '1.2.3.4'
          .toBeTruthy()

        expect isIPv4 '0.1.2.3'
          .toBeFalsy()

        expect isIPv4 '256.1.2.3'
          .toBeFalsy()


验证IPv6地址

      it 'should be IPv6 address', =>

        expect isIPv6 '::'
          .toBeTruthy()

        expect isIPv6 '::1'
          .toBeTruthy()

        expect isIPv6 '2001:2a53::8888'
          .toBeTruthy()

        expect isIPv6 '2001:4860:4860::8888'
          .toBeTruthy()

        expect isIPv6 'f3bb::a::c'
          .toBeFalsy()
