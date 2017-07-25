declare module is {
    function arguments(value1:any):boolean;
    function array(value1:any):boolean;
    function bool(value1:any):boolean;
    function date(value1:any):boolean;
    function error(value1:any):boolean;
    function fun(value1:any):boolean;
    function nan(value1:any):boolean;
    function nul(value1:any):boolean;
    function number(value1:any):boolean;
    function object(value1:any):boolean;
    function json(value1:any):boolean;
    function regexp(value1:any):boolean;
    function string(value1:any):boolean;
    function char(value1:any):boolean;
    function undefined(value1:any):boolean;
    function sameType(value1:any, value2:any):boolean;
    function empty(value1:Object|any[]|string):boolean;
    function existy(value1:any):boolean;
    function truthy(value1:any):boolean;
    function falsy(value1:any):boolean;
    function space(value1:string):boolean;
    function url(value1:any):boolean;
    function email(value1:any):boolean;
    function creditCard(value1:any):boolean;
    function alphaNumeric(value1:any):boolean;
    function timeString(value1:any):boolean;
    function dateString(value1:any):boolean;
    function usZipCode(value1:any):boolean;
    function caPostalCode(value1:any):boolean;
    function ukPostCode(value1:any):boolean;
    function nanpPhone(value1:any):boolean;
    function eppPhone(value1:any):boolean;
    function socialSecurityNumber(value1:any):boolean;
    function affirmative(value1:any):boolean;
    function hexadecimal(value1:any):boolean;
    function hexColor(value1:any):boolean;
    function ip(value1:any):boolean;
    function ipv4(value1:any):boolean;
    function ipv6(value1:any):boolean;
    function include(value1:string, value2:String):boolean;
    function upperCase(value1:string):boolean;
    function lowerCase(value1:string):boolean;
    function startWith(value1:string, value2:String):boolean;
    function endWith(value1:string, value2:String):boolean;
    function capitalized(value1:string, value2:String):boolean;
    function palindrome(value1:string):boolean;
    function equal(value1:any, value2:any):boolean;
    function even(value1:number):boolean;
    function odd(value1:number):boolean;
    function positive(value1:number):boolean;
    function negative(value1:number):boolean;
    function above(value1:number, min):boolean;
    function under(value1:number, min):boolean;
    function within(value1:number, min, max):boolean;
    function decimal(value1:number):boolean;
    function integer(value1:number):boolean;
    function finite(value1:number):boolean;
    function infinite(value1:number):boolean;
    function propertyCount(value1:Object, count):boolean;
    function propertyDefined(value1:Object, property):boolean;
    function windowObject(value1:any):boolean;
    function domNode(value1:Object):boolean;
    function inArray(value1:any[]):boolean;
    function sorted(value1:any[]):boolean;
    function ie(value1:number):boolean;
    function edge():boolean;
    function chrome():boolean;
    function firefox():boolean;
    function opera():boolean;
    function safari():boolean;
    function ios():boolean;
    function iphone():boolean;
    function ipad():boolean;
    function ipod():boolean;
    function android():boolean;
    function androidPhone():boolean;
    function androidTablet():boolean;
    function blackberry():boolean;
    function windowsPhone():boolean;
    function windowsTablet():boolean;
    function windows():boolean;
    function mac():boolean;
    function linux():boolean;
    function desktop():boolean;
    function mobile():boolean;
    function tablet():boolean;
    function online():boolean;
    function offline():boolean;
    function touchDevice():boolean;
    function today(value1:Object):boolean;
    function yesterday(value1:Object):boolean;
    function tomorrow(value1:Object):boolean;
    function past(value1:Object):boolean;
    function future(value1:Object):boolean;
    function day(value1:Object, dayString):boolean;
    function month(value1:Object, monthString):boolean;
    function year(value1:Object, yearNumber):boolean;
    function leapYear(value1:number):boolean;
    function weekend(value1:Object):boolean;
    function weekday(value1:Object):boolean;
    function inDateRange(value1:Object, startObject, endObject):boolean;
    function inLastWeek(value1:Object):boolean;
    function inLastMonth(value1:Object):boolean;
    function inLastYear(value1:Object):boolean;
    function inNextWeek(value1:Object):boolean;
    function inNextMonth(value1:Object):boolean;
    function inNextYear(value1:Object):boolean;
    function quarterOfYear(value1:Object, quarterNumber):boolean;
    function dayLightSavingTime(value1:Object, quarterNumber):boolean;
    function setRegexp(value1:RegExp, regexpString):boolean;
    function setNamespace():boolean;

    module not {
        function arguments(value1:any):boolean;
        function array(value1:any):boolean;
        function bool(value1:any):boolean;
        function date(value1:any):boolean;
        function error(value1:any):boolean;
        function fun(value1:any):boolean;
        function nan(value1:any):boolean;
        function nul(value1:any):boolean;
        function number(value1:any):boolean;
        function object(value1:any):boolean;
        function json(value1:any):boolean;
        function regexp(value1:any):boolean;
        function string(value1:any):boolean;
        function char(value1:any):boolean;
        function undefined(value1:any):boolean;
        function sameType(value1:any, value2:any):boolean;
        function empty(value1:Object|any[]|string):boolean;
        function existy(value1:any):boolean;
        function truthy(value1:any):boolean;
        function falsy(value1:any):boolean;
        function space(value1:string):boolean;
        function url(value1:any):boolean;
        function email(value1:any):boolean;
        function creditCard(value1:any):boolean;
        function alphaNumeric(value1:any):boolean;
        function timeString(value1:any):boolean;
        function dateString(value1:any):boolean;
        function usZipCode(value1:any):boolean;
        function caPostalCode(value1:any):boolean;
        function ukPostCode(value1:any):boolean;
        function nanpPhone(value1:any):boolean;
        function eppPhone(value1:any):boolean;
        function socialSecurityNumber(value1:any):boolean;
        function affirmative(value1:any):boolean;
        function hexadecimal(value1:any):boolean;
        function hexColor(value1:any):boolean;
        function ip(value1:any):boolean;
        function ipv4(value1:any):boolean;
        function ipv6(value1:any):boolean;
        function include(value1:string, value2:String):boolean;
        function upperCase(value1:string):boolean;
        function lowerCase(value1:string):boolean;
        function startWith(value1:string, value2:String):boolean;
        function endWith(value1:string, value2:String):boolean;
        function capitalized(value1:string, value2:String):boolean;
        function palindrome(value1:string):boolean;
        function equal(value1:any, value2:any):boolean;
        function even(value1:number):boolean;
        function odd(value1:number):boolean;
        function positive(value1:number):boolean;
        function negative(value1:number):boolean;
        function above(value1:number, min):boolean;
        function under(value1:number, min):boolean;
        function within(value1:number, min, max):boolean;
        function decimal(value1:number):boolean;
        function integer(value1:number):boolean;
        function finite(value1:number):boolean;
        function infinite(value1:number):boolean;
        function propertyCount(value1:Object, count):boolean;
        function propertyDefined(value1:Object, property):boolean;
        function windowObject(value1:any):boolean;
        function domNode(value1:Object):boolean;
        function inArray(value1:any[]):boolean;
        function sorted(value1:any[]):boolean;
        function ie(value1:number):boolean;
        function edge():boolean;
        function chrome():boolean;
        function firefox():boolean;
        function opera():boolean;
        function safari():boolean;
        function ios():boolean;
        function iphone():boolean;
        function ipad():boolean;
        function ipod():boolean;
        function android():boolean;
        function androidPhone():boolean;
        function androidTablet():boolean;
        function blackberry():boolean;
        function windowsPhone():boolean;
        function windowsTablet():boolean;
        function windows():boolean;
        function mac():boolean;
        function linux():boolean;
        function desktop():boolean;
        function mobile():boolean;
        function tablet():boolean;
        function online():boolean;
        function offline():boolean;
        function touchDevice():boolean;
        function today(value1:Object):boolean;
        function yesterday(value1:Object):boolean;
        function tomorrow(value1:Object):boolean;
        function past(value1:Object):boolean;
        function future(value1:Object):boolean;
        function day(value1:Object, dayString):boolean;
        function month(value1:Object, monthString):boolean;
        function year(value1:Object, yearNumber):boolean;
        function leapYear(value1:number):boolean;
        function weekend(value1:Object):boolean;
        function weekday(value1:Object):boolean;
        function inDateRange(value1:Object, startObject, endObject):boolean;
        function inLastWeek(value1:Object):boolean;
        function inLastMonth(value1:Object):boolean;
        function inLastYear(value1:Object):boolean;
        function inNextWeek(value1:Object):boolean;
        function inNextMonth(value1:Object):boolean;
        function inNextYear(value1:Object):boolean;
        function quarterOfYear(value1:Object, quarterNumber):boolean;
        function dayLightSavingTime(value1:Object, quarterNumber):boolean;
    }


    module all {
        function arguments(...args):boolean;
        function array(...args):boolean;
        function bool(...args):boolean;
        function date(...args):boolean;
        function error(...args):boolean;
        function fun(...args):boolean;
        function nan(...args):boolean;
        function nul(...args):boolean;
        function number(...args):boolean;
        function object(...args):boolean;
        function json(...args):boolean;
        function regexp(...args):boolean;
        function string(...args):boolean;
        function char(...args):boolean;
        function undefined(...args):boolean;
        function empty(...args):boolean;
        function existy(...args):boolean;
        function truthy(...args):boolean;
        function falsy(...args):boolean;
        function space(...args):boolean;
        function url(...args):boolean;
        function email(...args):boolean;
        function creditCard(...args):boolean;
        function alphaNumeric(...args):boolean;
        function timeString(...args):boolean;
        function dateString(...args):boolean;
        function usZipCode(...args):boolean;
        function caPostalCode(...args):boolean;
        function ukPostCode(...args):boolean;
        function nanpPhone(...args):boolean;
        function eppPhone(...args):boolean;
        function socialSecurityNumber(...args):boolean;
        function affirmative(...args):boolean;
        function hexadecimal(...args):boolean;
        function hexColor(...args):boolean;
        function ip(...args):boolean;
        function ipv4(...args):boolean;
        function ipv6(...args):boolean;
        function upperCase(...args):boolean;
        function lowerCase(...args):boolean;
        function capitalized(...args):boolean;
        function palindrome(...args):boolean;
        function even(...args):boolean;
        function odd(...args):boolean;
        function positive(...args):boolean;
        function negative(...args):boolean;
        function decimal(...args):boolean;
        function integer(...args):boolean;
        function finite(...args):boolean;
        function infinite(...args):boolean;
        function windowObject(...args):boolean;
        function domNode(...args):boolean;
        function sorted(...args):boolean;
        function today(...args):boolean;
        function yesterday(...args):boolean;
        function tomorrow(...args):boolean;
        function past(...args):boolean;
        function future(...args):boolean;
        function leapYear(...args):boolean;
        function weekend(...args):boolean;
        function weekday(...args):boolean;
    }


    module any {
        function arguments(...args):boolean;
        function array(...args):boolean;
        function bool(...args):boolean;
        function date(...args):boolean;
        function error(...args):boolean;
        function fun(...args):boolean;
        function nan(...args):boolean;
        function nul(...args):boolean;
        function number(...args):boolean;
        function object(...args):boolean;
        function json(...args):boolean;
        function regexp(...args):boolean;
        function string(...args):boolean;
        function char(...args):boolean;
        function undefined(...args):boolean;
        function empty(...args):boolean;
        function existy(...args):boolean;
        function truthy(...args):boolean;
        function falsy(...args):boolean;
        function space(...args):boolean;
        function url(...args):boolean;
        function email(...args):boolean;
        function creditCard(...args):boolean;
        function alphaNumeric(...args):boolean;
        function timeString(...args):boolean;
        function dateString(...args):boolean;
        function usZipCode(...args):boolean;
        function caPostalCode(...args):boolean;
        function ukPostCode(...args):boolean;
        function nanpPhone(...args):boolean;
        function eppPhone(...args):boolean;
        function socialSecurityNumber(...args):boolean;
        function affirmative(...args):boolean;
        function hexadecimal(...args):boolean;
        function hexColor(...args):boolean;
        function ip(...args):boolean;
        function ipv4(...args):boolean;
        function ipv6(...args):boolean;
        function upperCase(...args):boolean;
        function lowerCase(...args):boolean;
        function capitalized(...args):boolean;
        function palindrome(...args):boolean;
        function even(...args):boolean;
        function odd(...args):boolean;
        function positive(...args):boolean;
        function negative(...args):boolean;
        function decimal(...args):boolean;
        function integer(...args):boolean;
        function finite(...args):boolean;
        function infinite(...args):boolean;
        function windowObject(...args):boolean;
        function domNode(...args):boolean;
        function sorted(...args):boolean;
        function today(...args):boolean;
        function yesterday(...args):boolean;
        function tomorrow(...args):boolean;
        function past(...args):boolean;
        function future(...args):boolean;
        function leapYear(...args):boolean;
        function weekend(...args):boolean;
        function weekday(...args):boolean;
    }

}