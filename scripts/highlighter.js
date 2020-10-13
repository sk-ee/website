
var _pyfunc_format = function (v, fmt) {  // nargs: 2
    fmt = fmt.toLowerCase();
    var s = String(v);
    if (fmt.indexOf('!r') >= 0) {
        try { s = JSON.stringify(v); } catch (e) { s = undefined; }
        if (typeof s === 'undefined') { s = v._IS_COMPONENT ? v.id : String(v); }
    }
    var fmt_type = '';
    if (fmt.slice(-1) == 'i' || fmt.slice(-1) == 'f' ||
        fmt.slice(-1) == 'e' || fmt.slice(-1) == 'g') {
            fmt_type = fmt[fmt.length-1]; fmt = fmt.slice(0, fmt.length-1);
    }
    var i0 = fmt.indexOf(':');
    var i1 = fmt.indexOf('.');
    var spec1 = '', spec2 = '';  // before and after dot
    if (i0 >= 0) {
        if (i1 > i0) { spec1 = fmt.slice(i0+1, i1); spec2 = fmt.slice(i1+1); }
        else { spec1 = fmt.slice(i0+1); }
    }
    // Format numbers
    if (fmt_type == '') {
    } else if (fmt_type == 'i') { // integer formatting, for %i
        s = parseInt(v).toFixed(0);
    } else if (fmt_type == 'f') {  // float formatting
        v = parseFloat(v);
        var decimals = spec2 ? Number(spec2) : 6;
        s = v.toFixed(decimals);
    } else if (fmt_type == 'e') {  // exp formatting
        v = parseFloat(v);
        var precision = (spec2 ? Number(spec2) : 6) || 1;
        s = v.toExponential(precision);
    } else if (fmt_type == 'g') {  // "general" formatting
        v = parseFloat(v);
        var precision = (spec2 ? Number(spec2) : 6) || 1;
        // Exp or decimal?
        s = v.toExponential(precision-1);
        var s1 = s.slice(0, s.indexOf('e')), s2 = s.slice(s.indexOf('e'));
        if (s2.length == 3) { s2 = 'e' + s2[1] + '0' + s2[2]; }
        var exp = Number(s2.slice(1));
        if (exp >= -4 && exp < precision) { s1=v.toPrecision(precision); s2=''; }
        // Skip trailing zeros and dot
        var j = s1.length-1;
        while (j>0 && s1[j] == '0') { j-=1; }
        s1 = s1.slice(0, j+1);
        if (s1.slice(-1) == '.') { s1 = s1.slice(0, s1.length-1); }
        s = s1 + s2;
    }
    // prefix/padding
    var prefix = '';
    if (spec1) {
        if (spec1[0] == '+' && v > 0) { prefix = '+'; spec1 = spec1.slice(1); }
        else if (spec1[0] == ' ' && v > 0) { prefix = ' '; spec1 = spec1.slice(1); }
    }
    if (spec1 && spec1[0] == '0') {
        var padding = Number(spec1.slice(1)) - (s.length + prefix.length);
        s = '0'.repeat(Math.max(0, padding)) + s;
    }
    return prefix + s;
};
var _pyfunc_op_add = function (a, b) { // nargs: 2
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    } return a + b;
};
var _pymeth_format = function () {
    if (this.constructor !== String) return this.format.apply(this, arguments);
    var parts = [], i = 0, i1, i2;
    var itemnr = -1;
    while (i < this.length) {
        // find opening
        i1 = this.indexOf('{', i);
        if (i1 < 0 || i1 == this.length-1) { break; }
        if (this[i1+1] == '{') {parts.push(this.slice(i, i1+1)); i = i1 + 2; continue;}
        // find closing
        i2 = this.indexOf('}', i1);
        if (i2 < 0) { break; }
        // parse
        itemnr += 1;
        var fmt = this.slice(i1+1, i2);
        var index = fmt.split(':')[0].split('!')[0];
        index = index? Number(index) : itemnr
        var s = _pyfunc_format(arguments[index], fmt);
        parts.push(this.slice(i, i1), s);
        i = i2 + 1;
    }
    parts.push(this.slice(i));
    return parts.join('');
};
var _pymeth_replace = function (s1, s2, count) {  // nargs: 2 3
    if (this.constructor !== String) return this.replace.apply(this, arguments);
    var i = 0, i2, parts = [];
    count = (count === undefined) ? 1e20 : count;
    while (count > 0) {
        i2 = this.indexOf(s1, i);
        if (i2 >= 0) {
            parts.push(this.slice(i, i2));
            parts.push(s2);
            i = i2 + s1.length;
            count -= 1;
        } else break;
    }
    parts.push(this.slice(i));
    return parts.join('');
};
var _pymeth_split = function (sep, count) { // nargs: 0, 1 2
    if (this.constructor !== String) return this.split.apply(this, arguments);
    if (sep === '') {var e = Error('empty sep'); e.name='ValueError'; throw e;}
    sep = (sep === undefined) ? /\s/ : sep;
    if (count === undefined) { return this.split(sep); }
    var res = [], i = 0, index1 = 0, index2 = 0;
    while (i < count && index1 < this.length) {
        index2 = this.indexOf(sep, index1);
        if (index2 < 0) { break; }
        res.push(this.slice(index1, index2));
        index1 = index2 + sep.length || 1;
        i += 1;
    }
    res.push(this.slice(index1));
    return res;
};
var actually_ended, cmd, cmd_list, ending, intlist, keyword_list, not_hl, number, split_input, stub1_seq, stub2_itr, stub3_seq, stub4_itr, stub5_seq, stub6_itr, stub7_seq, stub8_itr, symbol, symbol_list, word;
not_hl = document.getElementById("tohighlight");
keyword_list = ["detect", "type=", "c=", "r=", "@e", "@s", "@p", "@r", "name=", "showcoordinates", "alwaysday", "commandblockoutput", "false", "true", "immediaterespawn", "falldamage", "dotiledrops", "keepinventory", "commandfeedback", "randomtickspeed", "tick", "dummy", "armor_stand", "entity", "domobspawning", "rawtext"];
intlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
symbol_list = ["~", "!", "[", "]", ":", "(", ")", "/", "=", "+", "-"];
cmd_list = ["execute", "spreadplayers", "tag", "testfor", "testforblock", "testforblocks", "setblock", "fill", "effect", "teleport", "summon", "clear", "give", "tellraw", "title", "particle", "scoreboard"];
split_input = _pymeth_split.call(not_hl);
ending = "";
stub1_seq = symbol_list;
if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
    symbol = stub1_seq[stub2_itr];
    ending = _pymeth_replace.call(split_input, symbol, _pymeth_format.call("<symbolify>{}</symbolify>", symbol));
}
stub3_seq = cmd_list;
if ((typeof stub3_seq === "object") && (!Array.isArray(stub3_seq))) { stub3_seq = Object.keys(stub3_seq);}
for (stub4_itr = 0; stub4_itr < stub3_seq.length; stub4_itr += 1) {
    cmd = stub3_seq[stub4_itr];
    ending = _pyfunc_op_add(ending, (_pymeth_replace.call(split_input, cmd, _pymeth_format.call("<commandify>{}</commandify>", cmd))));
}
stub5_seq = keyword_list;
if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) { stub5_seq = Object.keys(stub5_seq);}
for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
    word = stub5_seq[stub6_itr];
    ending = _pyfunc_op_add(ending, (_pymeth_replace.call(split_input, word, _pymeth_format.call("<keywordify>{}</keywordify>", word))));
}
stub7_seq = intlist;
if ((typeof stub7_seq === "object") && (!Array.isArray(stub7_seq))) { stub7_seq = Object.keys(stub7_seq);}
for (stub8_itr = 0; stub8_itr < stub7_seq.length; stub8_itr += 1) {
    number = stub7_seq[stub8_itr];
    ending = _pyfunc_op_add(ending, (_pymeth_replace.call(split_input, number, _pymeth_format.call("<numberify>{}</numberify>", number))));
}
actually_ended = _pymeth_replace.call(((_pymeth_replace.call(((_pymeth_replace.call(((_pymeth_replace.call(_pymeth_replace.call(ending, "[", ""), "]", ""))), "'", ""))), ("\""), ""))), ",", "");
while (true) {
    await new Promise(r => setTimeout(r, 100));
    document.getElementById("tohighlight").innerHTML = actually_ended;
}
