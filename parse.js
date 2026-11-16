// A fast, dependency-free CommonMark 0.31.2 + GFM markdown renderer.
// Written from the CommonMark/GFM spec behaviour and the practice cases;
// it returns the same HTML as marked 18.1.3 with default options.
const ENT = {
  AElig: 'Æ', AMP: '&', amp: '&', Aacute: 'Á', Acirc: 'Â', Agrave: 'À', Aring: 'Å',
  Atilde: 'Ã', Auml: 'Ä', Ccedil: 'Ç', Eacute: 'É', Ecirc: 'Ê', Egrave: 'È',
  Euml: 'Ë', Iacute: 'Í', Icirc: 'Î', Igrave: 'Ì', Iuml: 'Ï', ETH: 'Ð', Ntilde: 'Ñ',
  Oacute: 'Ó', Ocirc: 'Ô', Ograve: 'Ò', Oslash: 'Ø', Otilde: 'Õ', Ouml: 'Ö',
  THORN: 'Þ', Uacute: 'Ú', Ucirc: 'Û', Ugrave: 'Ù', Uuml: 'Ü', Yacute: 'Ý',
  aacute: 'á', acirc: 'â', aelig: 'æ', agrave: 'à', aring: 'å', atilde: 'ã',
  auml: 'ä', ccedil: 'ç', eacute: 'é', ecirc: 'ê', egrave: 'è', eth: 'ð',
  euml: 'ë', iacute: 'í', icirc: 'î', igrave: 'ì', iuml: 'ï', ntilde: 'ñ',
  oacute: 'ó', ocirc: 'ô', ograve: 'ò', oslash: 'ø', otilde: 'õ', ouml: 'ö',
  thorn: 'þ', uacute: 'ú', ucirc: 'û', ugrave: 'ù', uuml: 'ü', yacute: 'ý',
  yuml: 'ÿ', szlig: 'ß', copy: '©', COPY: '©', reg: '®', REG: '®', trade: '™',
  TRADE: '™', nbsp: '\u00a0', iexcl: '¡', cent: '¢', pound: '£', curren: '¤',
  yen: '¥', brvbar: '¦', sect: '§', uml: '¨', ordf: 'ª', ordm: 'º', iquest: '¿',
  micro: 'µ', para: '¶', middot: '·', cedil: '¸', sup1: '¹', sup2: '²', sup3: '³',
  frac14: '¼', frac12: '½', frac34: '¾', laquo: '«', raquo: '»', deg: '°',
  plusmn: '±', acute: '´', not: '¬', shy: '\u00ad', macr: '¯', times: '×',
  divide: '÷', euro: '€', lt: '<', LT: '<', gt: '>', GT: '>', quot: '"', QUOT: '"',
  apos: "'", lsquo: '‘', rsquo: '’', sbquo: '‚', ldquo: '“', rdquo: '”',
  bdquo: '„', dagger: '†', Dagger: '‡', permil: '‰', lsaquo: '‹', rsaquo: '›',
  ensp: '\u2002', emsp: '\u2003', thinsp: '\u2009', zwnj: '\u200c', zwj: '\u200d',
  lrm: '\u200e', rlm: '\u200f', ndash: '–', mdash: '—', lsquo2: '‘', hellip: '…',
  prime: '′', Prime: '″', oline: '‾', frasl: '⁄', bull: '•', larr: '←',
  uarr: '↑', rarr: '→', darr: '↓', harr: '↔', crarr: '↵', lArr: '⇐',
  uArr: '⇑', rArr: '⇒', dArr: '⇓', hArr: '⇔', forall: '∀', part: '∂',
  exist: '∃', empty: '∅', nabla: '∇', isin: '∈', notin: '∉', ni: '∋',
  prod: '∏', sum: '∑', minus: '−', lowast: '∗', radic: '√', prop: '∝',
  infin: '∞', ang: '∠', and: '∧', or: '∨', cap: '∩', cup: '∪', int: '∫',
  there4: '∴', sim: '∼', cong: '≅', asymp: '≈', ne: '≠', equiv: '≡',
  le: '≤', ge: '≥', sub: '⊂', sup: '⊃', nsub: '⊄', sube: '⊆', supe: '⊇',
  oplus: '⊕', otimes: '⊗', perp: '⊥', sdot: '⋅', lceil: '⌈', rceil: '⌉',
  lfloor: '⌊', rfloor: '⌋', lang: '⟨', rang: '⟩', loz: '◊', spades: '♠',
  clubs: '♣', hearts: '♥', diams: '♦', Alpha: 'Α', Beta: 'Β', Gamma: 'Γ',
  Delta: 'Δ', Epsilon: 'Ε', Zeta: 'Ζ', Eta: 'Η', Theta: 'Θ', Iota: 'Ι',
  Kappa: 'Κ', Lambda: 'Λ', Mu: 'Μ', Nu: 'Ν', Xi: 'Ξ', Omicron: 'Ο',
  Pi: 'Π', Rho: 'Ρ', Sigma: 'Σ', Tau: 'Τ', Upsilon: 'Υ', Phi: 'Φ',
  Chi: 'Χ', Psi: 'Ψ', Omega: 'Ω', alpha: 'α', beta: 'β', gamma: 'γ',
  delta: 'δ', epsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι',
  kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', omicron: 'ο',
  pi: 'π', rho: 'ρ', sigmaf: 'ς', sigma: 'σ', tau: 'τ', upsilon: 'υ',
  phi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω', thetasym: 'ϑ', upsih: 'ϒ',
  piv: 'ϖ', Dcaron: 'Ď', dcaron: 'ď', HilbertSpace: 'ℋ', DifferentialD: 'ⅆ',
  ClockwiseContourIntegral: '∲', ngE: '≧̸', frac13: '⅓', frac23: '⅔',
  frac15: '⅕', frac25: '⅖', frac35: '⅗', frac45: '⅘', frac16: '⅙',
  frac56: '⅚', frac18: '⅛', frac38: '⅜', frac58: '⅝', frac78: '⅞',
  weierp: '℘', image: 'ℑ', real: 'ℜ', alefsym: 'ℵ', lArr2: '⇐',
  check: '✓', cross: '✗', star: '☆', phone: '☎', female: '♀', male: '♂',
  circ: 'ˆ', tilde: '˜', ensp2: '\u2002', hairsp: '\u200a', NoBreak: '\u2060',
  ApplyFunction: '\u2061', InvisibleTimes: '\u2062', InvisibleComma: '\u2063',
  Tab: '\t', NewLine: '\n', colon: ':', semi: ';', comma: ',', period: '.',
  sol: '/', bsol: '\\', quest: '?', equals: '=', plus: '+', hyphen: '-',
  lowbar: '_',lpar: '(', rpar: ')', lbrack: '[', rbrack: ']', lbrace: '{',
  rbrace: '}', verbar: '|', Hat: '^', blank: ' ', Tab2: '\t',
};
// Named entities are NOT decoded in text (marked passes them through and
// only escapes & when it is not followed by word-chars + ';'). The table
// above is kept for the few places a decoded value is needed (none in the
// hot path) and for documentation of the entity set.
void ENT;

const PUNCT = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
function isPunct(c) { return c !== '' && PUNCT.indexOf(c) >= 0; }
// Unicode punctuation/symbol (CommonMark "punctuation character": ASCII
// punct or Unicode general categories P and S) — for flanking rules.
const UNI_PUNCT_RE = /[\p{P}\p{S}]/u;
function isUniPunct(c) { return c !== '' && (PUNCT.indexOf(c) >= 0 || UNI_PUNCT_RE.test(c)); }
function isSpace(c) {
  if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\f' || c === '\v') return true;
  const code = c.charCodeAt(0);
  return code === 0x00a0 || code === 0x1680 || (code >= 0x2000 && code <= 0x200a)
    || code === 0x2028 || code === 0x2029 || code === 0x202f || code === 0x205f
    || code === 0x3000 || code === 0xfeff;
}
function isDigit(c) { return c >= '0' && c <= '9'; }
function isAlpha(c) { return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'); }
function isAlnum(c) { return isAlpha(c) || isDigit(c); }

// Escape &, <, >, ", ' -- always (encode=true, used for text and code).
function escAll(s) {
  let out = '', start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    let rep = null;
    if (ch === '&') rep = '&amp;';
    else if (ch === '<') rep = '&lt;';
    else if (ch === '>') rep = '&gt;';
    else if (ch === '"') rep = '&quot;';
    else if (ch === "'") rep = '&#39;';
    if (rep) { out += s.slice(start, i) + rep; start = i + 1; }
  }
  return start === 0 ? s : out + s.slice(start);
}
// Escape for href/title/info: & is left alone when followed by word-chars
// or #digits / #x hex and then ';' (a would-be entity reference).
function escAttr(s) {
  let out = '', start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    let rep = null;
    if (ch === '&') {
      let j = i + 1, ok = false;
      if (s[j] === '#') {
        j++;
        if (s[j] === 'x' || s[j] === 'X') { j++; const st = j; while (j < s.length && /[0-9a-fA-F]/.test(s[j])) j++; ok = j - st >= 1 && j - st <= 6 && s[j] === ';'; }
        else { const st = j; while (j < s.length && isDigit(s[j])) j++; ok = j - st >= 1 && j - st <= 7 && s[j] === ';'; }
      } else {
        const st = j; while (j < s.length && (isAlnum(s[j]))) j++;
        ok = j > st && s[j] === ';';
      }
      if (!ok) rep = '&amp;';
    }
    else if (ch === '<') rep = '&lt;';
    else if (ch === '>') rep = '&gt;';
    else if (ch === '"') rep = '&quot;';
    else if (ch === "'") rep = '&#39;';
    if (rep) { out += s.slice(start, i) + rep; start = i + 1; }
  }
  return start === 0 ? s : out + s.slice(start);
}
// Decode a numeric entity at s[i]=='&' (&#123; / &#xAB;). Returns [char, end]
// or null. Decimal: 1-7 digits; hex: 1-6 digits; 0 / >0x10FFFF / surrogate -> U+FFFD.
function numericEntity(s, i) {
  if (s[i + 1] !== '#') return null;
  let j = i + 2, hex = false;
  if (s[j] === 'x' || s[j] === 'X') { hex = true; j++; }
  const st = j;
  if (hex) { while (j < s.length && /[0-9a-fA-F]/.test(s[j])) j++; if (j - st < 1 || j - st > 6 || s[j] !== ';') return null; }
  else { while (j < s.length && isDigit(s[j])) j++; if (j - st < 1 || j - st > 7 || s[j] !== ';') return null; }
  const v = parseInt(s.slice(st, j), hex ? 16 : 10);
  const ch = (v === 0 || v > 0x10FFFF || (v >= 0xD800 && v <= 0xDFFF)) ? '\uFFFD' : String.fromCodePoint(v);
  return [ch, j + 1];
}
function cleanUrl(href) {
  try { href = encodeURI(decodeURI(href)).replace(/%25/g, '%'); } catch (e) { /* keep as-is */ }
  return href;
}
function normalizeLabel(s) {
  // Collapse whitespace runs to one space, trim, Unicode case-fold.
  let out = '', wasSpace = true;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (isSpace(c)) { if (!wasSpace) out += ' '; wasSpace = true; }
    else { out += c.toLowerCase(); wasSpace = false; }
  }
  if (out.charCodeAt(out.length - 1) === 32) out = out.slice(0, -1);
  // Unicode case folding extras toLowerCase misses
  return out.replace(/ß/g, 'ss').replace(/ς/g, 'σ')
    .replace(/ﬀ/g, 'ff').replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl')
    .replace(/ﬃ/g, 'ffi').replace(/ﬄ/g, 'ffl').replace(/ﬅ/g, 'st').replace(/ﬆ/g, 'st');
}
// Resolve backslash escapes in a raw string (dest/title/info): \punct -> punct,
// \<newline> is dropped here by callers that need it; other \x stays as-is.
function unescapeStr(s) {
  if (s.indexOf('\\') < 0) return s;
  let out = '', start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && i + 1 < s.length && isPunct(s[i + 1])) { out += s.slice(start, i) + s[i + 1]; start = i + 2; i++; }
  }
  return start === 0 ? s : out + s.slice(start);
}

function containsLink(nodes) {
  for (const n of nodes) {
    // autolinks inside link text do not block the outer link (only
    // bracket-formed links do)
    if (n.k === 'link' && !n.auto) return true;
    if ((n.k === 'em' || n.k === 'strong' || n.k === 'del') && n.ch && containsLink(n.ch)) return true;
  }
  return false;
}
// Simulate marked's link-label pattern from q (just after '[') to the
// ']' at p. Returns true when p is a real link-closing bracket: the
// label reaches it without it being swallowed by a code span. In a
// label, a code span is a backtick run + non-backtick content + a
// backtick run (closing run not followed by a backtick); backticks
// immediately before ']' are literal.
// When an inline link/image [label](...) fails to form, marked does not
// let emphasis/strikethrough delimiters inside that label form either
// ([at _node foo_](foo bar) stays literal, while [at _node foo_][x]
// and [at _node foo_] do form emphasis). Literalize the delimiter
// nodes after the opener so the emphasis pass never sees them.
function suppressLabelDelims(nodes, bi) {
  for (let j = bi + 1; j < nodes.length; j++) {
    const nd = nodes[j];
    if (nd.k === 'd') nodes[j] = { k: 't', s: nd.c.repeat(nd.n) };
  }
}
function labelReachesBracket(src, q, p) {
  while (q < p) {
    const c = src[q];
    if (c === '`') {
      let r1 = 0; while (q + r1 < src.length && src[q + r1] === '`') r1++;
      // code span: opening run + non-backtick content + a closing run
      // of ANY length (marked's label regex does not require equal
      // runs: ``fixes` is a valid span in a label). Only a backtick
      // before ']' can close it — a closer past ']' does not count.
      let k = q + r1;
      while (k < p && src[k] !== '`') k++;
      if (k < p) {
        let r2 = 0; while (k + r2 < src.length && src[k + r2] === '`') r2++;
        q = k + r2; continue;
      }
      // no closing run within the label: backticks before ']' are
      // literal only when there are two or more of them; a single
      // unclosed backtick is a code-span opener with no closer, so
      // the label fails ([foo `] and [foo ` bar] form no link)
      if (src[q + r1] === ']' && r1 >= 2) { q += r1; continue; }
      return false;
    }
    if (c === '\\' && q + 1 < src.length) { q += 2; continue; }
    if (c === '[') {
      let depth = 1, k = q + 1;
      while (k < src.length && depth > 0) {
        if (src[k] === '\\' && k + 1 < src.length) { k += 2; continue; }
        if (src[k] === '[') depth++;
        else if (src[k] === ']') depth--;
        k++;
      }
      if (depth === 0) { q = k; continue; }
      return false;
    }
    if (c === ']') return false;
    q++;
  }
  return q === p;
}
// forAlt=false: reproduce the raw label text (escapes, emphasis marks and
// code ticks kept) so labels match their definition. forAlt=true: plain
// text for image alt attributes (markers stripped).
function plainText(nodes, forAlt) {
  let s = '';
  for (const n of nodes) {
    if (n.k === 't') s += n.s;
    else if (n.k === 'c') s += forAlt ? n.s : '`'.repeat(n.t || 1) + n.s + '`'.repeat(n.t || 1);
    else if (n.k === 'br') s += '\n';
    else if (n.k === 'link' || n.k === 'em' || n.k === 'strong' || n.k === 'del') s += plainText(n.ch, forAlt);
    else if (n.k === 'img') s += n.altRaw || '';
    else if (n.k === 'b') s += n.img ? '![' : '[';
    else if (n.k === 'te') s += forAlt ? n.s : '\\' + n.s;
    else if (n.k === 'soft') s += '\n';
    else if (n.k === 'd') s += forAlt ? '' : n.c.repeat(n.n);
    else if (n.k === 'h') s += n.s;
  }
  return s;
}
function renderNodes(nodes) {
  let out = '';
  for (const n of nodes) {
    if (n.k === 't') out += escAttr(n.s);
    else if (n.k === 'c') out += '<code>' + escAll(n.s) + '</code>';
    else if (n.k === 'h') out += n.s;
    else if (n.k === 'br') out += n.nl ? '<br>\n' : '<br>';
    else if (n.k === 'soft') out += '\n';
    else if (n.k === 'te') out += escAll(n.s);
    else if (n.k === 'em') out += '<em>' + renderNodes(n.ch) + '</em>';
    else if (n.k === 'strong') out += '<strong>' + renderNodes(n.ch) + '</strong>';
    else if (n.k === 'del') out += '<del>' + renderNodes(n.ch) + '</del>';
    else if (n.k === 'link') {
      out += '<a href="' + escAttr(cleanUrl(n.href)) + '"';
      if (n.title != null) out += ' title="' + escAttr(n.title) + '"';
      out += '>' + renderNodes(n.ch) + '</a>';
    } else if (n.k === 'img') {
      out += '<img src="' + escAttr(cleanUrl(n.href)) + '" alt="' + escAttr(n.altRaw) + '"';
      if (n.title != null) out += ' title="' + escAttr(n.title) + '"';
      out += '>';
    } else if (n.k === 'b') out += n.img ? '![' : '[';
  }
  return out;
}
// Emphasis / strikethrough: classic delimiter-stack processing over a
// flat node list. Delimiter nodes are {k:'d', c:'*'|'_'|'~', n, open, close}.
function processEmphasis(nodes) {
  for (const n of nodes) {
    if ((n.k === 'link' || n.k === 'em' || n.k === 'strong' || n.k === 'del') && n.ch) processEmphasis(n.ch);
  }
  const delims = [];
  for (let i = 0; i < nodes.length; i++) if (nodes[i].k === 'd') delims.push(nodes[i]);
  // marked's emStrong model for '*' and '_': for each opener in order,
  // scan forward for a closer. m starts at the opener's length; an
  // opener-only delimiter adds its length to m, a closer subtracts
  // its length; a closer that can also open is skipped by the rule of
  // three (opener + closer lengths a multiple of 3, unless both are).
  // The closer must bring m to <= 0.
  let di = 0;
  while (di < delims.length) {
    const opener = delims[di];
    if (opener.c === '~' || !opener.open || opener.n <= 0 || nodes.indexOf(opener) < 0) { di++; continue; }
    // marked's emStrongRDelim regex skips a '__...*...__' span (for a
    // '*' opener) right after the opener, hiding the single '*' from
    // the m counter (symmetrically '**..._...**' for a '_' opener).
    // That is why '*foo __bar *baz bim__ bam*' still forms the outer em.
    const skipNode = (() => {
      const other = opener.c === '*' ? '_' : '*';
      let i = nodes.indexOf(opener) + 1, stage = 0, target = null;
      while (i < nodes.length) {
        const nd = nodes[i];
        if (nd.k === 'd') {
          if (stage === 0 && nd.c === other && nd.n === 2) { stage = 1; i++; continue; }
          if (stage === 1 && nd.c === opener.c && nd.n === 1) { target = nd; stage = 2; i++; continue; }
          if (stage === 2 && nd.c === other && nd.n === 2) return target;
          return null;
        }
        if (nd.k === 't' || nd.k === 'soft' || nd.k === 'br' || nd.k === 'te') { i++; continue; }
        return null;
      }
      return null;
    })();
    let m = opener.n, y = opener.n, f = 0, closer = null;
    for (let j = di + 1; j < delims.length; j++) {
      const d = delims[j];
      if (d === skipNode) continue;
      if (d.c !== opener.c || d.n <= 0 || nodes.indexOf(d) < 0) continue;
      if (d.open && !d.close) { m += d.n; continue; }
      if (!d.close) continue;
      if (d.open && d.close && y % 3 !== 0 && (y + d.n) % 3 === 0) { f += d.n; continue; }
      m -= d.n;
      if (m > 0) continue;
      closer = d; break;
    }
    if (!closer) {
      if (opener.n > 1) {
        // marked consumes one delimiter as literal text and retries
        // the rest of the run as an opener (e.g. '**foo*' -> '*<em>foo</em>')
        const oIdx = nodes.indexOf(opener);
        if (oIdx >= 0) nodes.splice(oIdx, 0, { k: 't', s: opener.c });
        opener.n -= 1;
        continue;
      }
      di++; continue;
    }
    // marked's use: b is the closer run length adjusted by the
    // overshoot (m <= 0) and the rule-of-three skips (f); the em/strong
    // is decided by the parity of min(opener.n, b)
    const b = Math.max(1, Math.min(closer.n, closer.n + m + f));
    const use = (Math.min(opener.n, b) % 2 === 1) ? 1 : 2;
    const kind = use === 2 ? 'strong' : 'em';
    const oIdx = nodes.indexOf(opener), cIdx = nodes.indexOf(closer);
    if (oIdx < 0 || cIdx < 0 || cIdx <= oIdx) { di++; continue; }
    const inner = nodes.slice(oIdx + 1, cIdx);
    const openLeft = opener.n - use, closeLeft = b - use, closeOutside = closer.n - b;
    // leftover delimiters belong inside the wrapper, so they can form
    // inner emphasis (e.g. '__foo_ bar_' -> '<em><em>foo</em> bar</em>');
    // excess closer delimiters stay outside it ('*foo**' -> '<em>foo</em>*')
    const ch = [];
    if (openLeft > 0) ch.push({ k: 'd', c: opener.c, n: openLeft, open: opener.open, close: opener.close });
    ch.push(...inner);
    if (closeLeft > 0) ch.push({ k: 'd', c: closer.c, n: closeLeft, open: closer.open, close: closer.close });
    const wrapped = { k: kind, ch };
    const after = [];
    if (closeOutside > 0) after.push({ k: 'd', c: closer.c, n: closeOutside, open: closer.open, close: closer.close });
    nodes.splice(oIdx, cIdx - oIdx + 1, wrapped, ...after);
    processEmphasis(wrapped.ch);
    di++;
    // the opener/closer nodes are gone (remainders live inside the
    // wrapper or just after it); the outer loop skips them via indexOf
  }
  // strikethrough '~' keeps the closer-backward model
  let si = 0;
  while (si < delims.length) {
    const closer = delims[si];
    if (closer.c !== '~' || !closer.close || closer.n <= 0) { si++; continue; }
    let opener = null;
    for (let j = si - 1; j >= 0; j--) {
      const d = delims[j];
      if (d.c !== '~' || !d.open || d.n <= 0) continue;
      if (nodes.indexOf(d) < 0) continue;
      opener = d; break;
    }
    if (!opener) { si++; continue; }
    const use = Math.min(opener.n, closer.n, 2);
    const oIdx = nodes.indexOf(opener), cIdx = nodes.indexOf(closer);
    if (oIdx < 0 || cIdx < 0 || cIdx <= oIdx) { si++; continue; }
    const inner = nodes.slice(oIdx + 1, cIdx);
    opener.n -= use; closer.n -= use;
    const ch = [];
    if (opener.n > 0) ch.push({ k: 'd', c: '~', n: opener.n, open: opener.open, close: opener.close });
    ch.push(...inner);
    if (closer.n > 0) ch.push({ k: 'd', c: '~', n: closer.n, open: closer.open, close: closer.close });
    const wrapped = { k: 'del', ch };
    nodes.splice(oIdx, cIdx - oIdx + 1, wrapped);
    processEmphasis(wrapped.ch);
    si++;
  }
  // remaining delimiter nodes become literal text (recursing into wrappers)
  literalizeDelims(nodes);
}
function literalizeDelims(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.k === 'd') nodes[i] = { k: 't', s: n.c.repeat(n.n) };
    else if ((n.k === 'link' || n.k === 'em' || n.k === 'strong' || n.k === 'del') && n.ch) literalizeDelims(n.ch);
  }
}
function flanking(s, i, len) {
  const before = i > 0 ? s[i - 1] : '';
  const after = i + len < s.length ? s[i + len] : '';
  const beforeWs = before === '' || isSpace(before);
  const afterWs = after === '' || isSpace(after);
  const beforePunct = isUniPunct(before);
  const afterPunct = isUniPunct(after);
  const left = !afterWs && (!afterPunct || beforeWs || beforePunct);
  const right = !beforeWs && (!beforePunct || afterWs || afterPunct);
  return [left, right];
}
// Parse a link destination + optional title starting at s[i] (after '(' or
// after the ':' of a reference definition). Returns {dest, title, end}
// where end is the index just past the closing ')' (for inline) or past the
// title (for definitions), or null. allowNewline: title/dest may span lines.
function parseDestTitle(s, i, inline) {
  let p = i, nl = 0;
  while (p < s.length && (s[p] === ' ' || s[p] === '\t' || s[p] === '\n')) { if (s[p] === '\n') nl++; p++; }
  if (nl >= 2 || p >= s.length) return null;
  // empty destination is allowed for inline links: [link]()
  if (inline && s[p] === ')') return { dest: '', title: null, end: p + 1 };
  // angle-bracket destination: backslash escapes do not close it
  let dest = '';
  if (s[p] === '<') {
    let q = p + 1, buf = '';
    while (q < s.length && s[q] !== '>' && s[q] !== '\n') {
      if (s[q] === '\\' && q + 1 < s.length && isPunct(s[q + 1])) { buf += s[q + 1]; q += 2; continue; }
      buf += s[q]; q++;
    }
    if (s[q] !== '>') return null;
    dest = unescapeStr(buf);
    p = q + 1;
  } else {
    // bare destination: no spaces, balanced parens
    let q = p, depth = 0, buf = '';
    while (q < s.length) {
      const c = s[q];
      if (c === ' ' || c === '\t' || c === '\n') break;
      if (c === '\\' && q + 1 < s.length && isPunct(s[q + 1])) { buf += s[q + 1]; q += 2; continue; }
      if (c === '(') { depth++; buf += c; q++; continue; }
      if (c === ')') {
        if (depth === 0) break;
        depth--; buf += c; q++; continue;
      }
      if (c < ' ' ) break;
      buf += c; q++;
    }
    if (q === p) return null;
    dest = buf; p = q;
  }
  const destEnd = p;
  const destLineNl = (s.slice(0, destEnd).match(/\n/g) || []).length;
  // optional title (must be separated from the destination by whitespace)
  let title = null, saveP = p;
  let r = p, sep = 0, sepNl = 0;
  while (r < s.length && (s[r] === ' ' || s[r] === '\t' || s[r] === '\n')) { if (s[r] === '\n') sepNl++; r++; sep++; }
  if (sep > 0 && sepNl <= 1 && r < s.length && (s[r] === '"' || s[r] === "'" || s[r] === '(')) {
    const open = s[r], close = open === '(' ? ')' : open;
    const titleLineNl = (s.slice(0, r).match(/\n/g) || []).length;
    let q = r + 1, buf = '', ok = false, badBlank = false;
    while (q < s.length) {
      const c = s[q];
      if (c === '\n' && s[q + 1] === '\n') { badBlank = true; break; }
      if (c === '\\' && q + 1 < s.length && isPunct(s[q + 1])) { buf += s[q + 1]; q += 2; continue; }
      if (c === close) { ok = true; break; }
      buf += c; q++;
    }
    if (ok && !badBlank) {
      // junk after the title on its own line (definitions only: for inline
      // links the ')' check below decides)
      if (!inline) {
        let a = q + 1, rem = '';
        while (a < s.length && s[a] !== '\n') { rem += s[a]; a++; }
        if (rem.trim() !== '') {
          if (titleLineNl === destLineNl) return null;
          // title on a later line with junk after it: drop the title
          title = null; p = destEnd;
        } else { title = buf; p = q + 1; }
      } else { title = buf; p = q + 1; }
    } else {
      // title never closed (or spans a blank line): fatal only when the
      // title started on the same line as the destination
      if (titleLineNl === destLineNl) return null;
      title = null; p = destEnd;
    }
  }
  if (inline) {
    let r2 = p;
    while (r2 < s.length && (s[r2] === ' ' || s[r2] === '\t' || s[r2] === '\n')) r2++;
    if (s[r2] !== ')') return null;
    return { dest, title, end: r2 + 1 };
  }
  return { dest, title, end: p, afterTitle: saveP };
}
// Find the end of a [...] label starting at s[i]=='['. Returns {label, end}
// (end past ']') or null. A label may not contain an unescaped '['.
function scanLabel(s, i) {
  let depth = 0, j = i;
  while (j < s.length) {
    const c = s[j];
    if (c === '\\' && j + 1 < s.length) { j += 2; continue; }
    if (c === '[') { if (depth > 0) return null; depth++; }
    else if (c === ']') { depth--; if (depth === 0) return { label: s.slice(i + 1, j), end: j + 1 }; }
    else if (c === '`') {
      // skip code span inside label (brackets inside don't count)
      let k = j, n = 0; while (k < s.length && s[k] === '`') { n++; k++; }
      const idx = s.indexOf('`'.repeat(n), k);
      if (idx < 0) return null;
      j = idx + n; continue;
    }
    j++;
  }
  return null;
}
const SCHEME_RE = /^[A-Za-z][A-Za-z0-9+.-]{1,31}:/;
function tryAutolink(s, i) {
  if (s[i] !== '<') return null;
  const gt = s.indexOf('>', i + 1);
  if (gt < 0 || gt - i > 400) return null;
  const inner = s.slice(i + 1, gt);
  if (inner.indexOf(' ') >= 0 || inner.indexOf('<') >= 0 || inner.indexOf('\n') >= 0) return null;
  if (SCHEME_RE.test(inner)) {
    return { href: inner, text: inner, end: gt + 1 };
  }
  // email autolink <a@b.c>
  if (/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(inner)) {
    return { href: 'mailto:' + inner, text: inner, end: gt + 1 };
  }
  return null;
}
function tryHtmlTag(s, i) {
  if (s[i] !== '<') return null;
  const rest = s.slice(i);
  // comment: <!--> and <!---> are abruptly-closed empty comments
  // (HTML spec); a normal comment needs --> to close
  let m = rest.match(/^<!-->|^<!--->|^<!--(?:(?!-->)[\s\S])*?-->/);
  if (m) return m[0];
  m = rest.match(/^<\?(?:(?!\?>)[\s\S])*?\?>/);
  if (m) return m[0];
  m = rest.match(/^<![A-Za-z][^>]*>/);
  if (m) return m[0];
  m = rest.match(/^<!\[CDATA\[(?:(?!\]\]>)[\s\S])*?\]\]>/);
  if (m) return m[0];
  // open tag (attributes allowed) / close tag (no attributes)
  m = rest.match(/^<[A-Za-z][A-Za-z0-9-]*(?:\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>/);
  if (m) return m[0];
  m = rest.match(/^<\/[A-Za-z][A-Za-z0-9-]*\s*>/);
  if (m) return m[0];
  return null;
}
function trimExtEnd(s) {
  // marked's _backpedal, applied until stable: keeps runs of
  // non-punctuation, balanced (...) groups, and punctuation that is
  // NOT at the end (so ')]' is kept when more URL follows it)
  const re = /^(?:[^?!.,:;*_'\"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'\"~)]+(?!$))+/;
  let prev = null, cur = s;
  while (prev !== cur) { prev = cur; const m = re.exec(cur); cur = m ? m[0] : ''; }
  return cur;
}
// extended-autolink patterns as sticky regexes (anchored at lastIndex,
// so tryExtAutolink never slices the rest of the string per call)
const EXT_URL_RE = /(?:https?:\/\/|ftp:\/\/)(?:[A-Za-z0-9-]+\.?)+[^\s<]*/iy;
const EXT_WWW_RE = /www\.(?:[A-Za-z0-9-]+\.?)+[^\s<]*/y;
const EXT_EMAIL_RE = /(?:[A-Za-z][A-Za-z0-9+.-]{1,31}:)?[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9_-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9_-]{0,61}[A-Za-z0-9])?)+/y;
function tryExtAutolink(s, i, nodes, linkForms) {
  const prev = i > 0 ? s[i - 1] : '';
  if (prev !== '' && (isAlnum(prev) || prev === '/' || prev === '.')) return null;
  // scheme:// (case-insensitive) or www. (lowercase only); marked's
  // url regex takes [^\s<]* then trims with _backpedal (no dot required)
  let m = null;
  EXT_URL_RE.lastIndex = i; m = EXT_URL_RE.exec(s);
  if (!m) { EXT_WWW_RE.lastIndex = i; m = EXT_WWW_RE.exec(s); }
  if (m) {
    let raw = m[0];
    // truncate at a ']' that actually closes an enclosing bracket link
    // BEFORE the backpedal, so emphasis delimiters just before that
    // ']' end up trailing and are trimmed (marked's link tokenizer
    // runs first, so the url never crosses the link's text)
    if (linkForms) {
      for (let q = 0; q < raw.length; q++) {
        if (raw[q] === ']' && linkForms(i + q)) { raw = raw.slice(0, q); break; }
      }
    }
    let url = trimExtEnd(raw);
    if (url.length < 5) return null;
    const href = /^www\./.test(url) ? 'http://' + url : url;
    return { href, text: url, end: i + url.length };
  }
  // email (possibly with scheme like mailto: / xmpp:); domain labels
  // may contain '_' inside (foo@bar.baz_b links) but not at the end
  EXT_EMAIL_RE.lastIndex = i;
  const em = EXT_EMAIL_RE.exec(s);
  if (em) {
    let url = trimExtEnd(em[0]);
    // include a single-segment /path for scheme emails (xmpp:foo@bar/txt),
    // but not a bare trailing '/' and not further segments
    if (/^[A-Za-z][A-Za-z0-9+.-]{1,31}:/.test(url)) {
      let j = i + url.length;
      if (s[j] === '/' && j + 1 < s.length && /[A-Za-z0-9\-._~:?#@!$&'()*+,;=%]/.test(s[j + 1])) {
        let k = j + 1; while (k < s.length && /[A-Za-z0-9\-._~:?#@!$&'()*+,;=%]/.test(s[k])) k++;
        url = trimExtEnd(s.slice(i, k));
      }
    }
    // an email immediately followed by '-' is not an autolink (the
    // domain label would end with an invalid character); a trailing
    // '_' blocks it too, unless it closes an open '_' emphasis
    // delimiter (then the autolink forms inside the emphasis)
    const after = s[i + url.length];
    if (after === '-') return null;
    if (after === '_') {
      let hasOpener = false;
      if (nodes) for (let q = nodes.length - 1; q >= 0; q--) { if (nodes[q].k === 'd' && nodes[q].c === '_' && nodes[q].open) { hasOpener = true; break; } }
      if (!hasOpener) return null;
    }
    if (url.indexOf('@') < 0) return null;
    const href = /^[A-Za-z][A-Za-z0-9+.-]{1,31}:/.test(url) ? url : 'mailto:' + url;
    return { href, text: url, end: i + url.length };
  }
  return null;
}

// marked's lexer state: an '<a ' tag (startATag /^<a /i) sets inLink,
// '</a>' (endATag) clears it; while set, extended autolinks do not form
let inLink = false;

function parseInline(src, refs) {
  // marked's url (extended autolink) tokenizer is skipped inside a link's
  // text, but <...> autolinks still form there: when a bracket-formed
  // link closes, turn any extended autolink inside its text back into
  // plain text (recursively, through emphasis wrappers)
  const stripExtAutolinks = (list) => {
    for (let q = 0; q < list.length; q++) {
      const nd = list[q];
      if (nd.k === 'link' && nd.auto === 'ext') {
        list[q] = { k: 't', s: nd.ch && nd.ch[0] ? nd.ch[0].s : '' };
      } else if (nd.ch) stripExtAutolinks(nd.ch);
    }
  };
  const nodes = [];
  let text = '';
  const flushText = () => { if (text) { nodes.push({ k: 't', s: text }); text = ''; } };
  const pushText = (s) => { text += s; };
  let i = 0, n = src.length;
  let pendingImg = false;
  // Would the ']' at position p complete a link for the nearest active
  // bracket opener? A link takes precedence over a code span (marked
  // tokenizes the link first), so a code span must not swallow the ']'
  // that completes it.
  const linkFormsAtBracket = (p) => {
    let bs = 0; for (let q = p - 1; q >= 0 && src[q] === '\\'; q--) bs++;
    if (bs % 2 === 1) return false;
    let bi = -1;
    for (let j = nodes.length - 1; j >= 0; j--) { if (nodes[j].k === 'b' && nodes[j].active) { bi = j; break; } }
    if (bi < 0) return false;
    if (nodes[bi].img) return false; // images may contain links
    // a link may not contain another link: if the text between the
    // opener and this ']' already has one, this ']' closes nothing
    const kids = nodes.slice(bi + 1);
    if (text) kids.push({ k: 't', s: text });
    if (containsLink(kids)) return false;
    // the ']' must be a real link-closing bracket per the label pattern
    if (!labelReachesBracket(src, nodes[bi].pos + 1, p)) return false;
    const labelSoFar = () => normalizeLabel(plainText(nodes.slice(bi + 1)) + text + src.slice(i, p));
    const after = src[p + 1];
    if (after === '(') {
      if (parseDestTitle(src, p + 2, true)) return true;
      return refs.has(labelSoFar());
    }
    if (after === '[') {
      const lab = scanLabel(src, p + 1);
      if (lab && refs.has(normalizeLabel(lab.label))) return true;
      if (src[p + 2] === ']') return refs.has(labelSoFar());
      return false;
    }
    return refs.has(labelSoFar());
  };
  while (i < n) {
    const c = src[i];
    // hard / soft line breaks
    if (c === '\n') {
      flushText();
      nodes.push({ k: 'soft' });
      i++; continue;
    }
    if (c === '\\') {
      const nx = src[i + 1];
      if (nx === '\n') { flushText(); nodes.push({ k: 'br', nl: false }); i += 2; continue; }
      if (nx !== undefined && isPunct(nx)) { flushText(); nodes.push({ k: 'te', s: nx }); i += 2; continue; }
      pushText('\\'); i++; continue;
    }
    if (c === '`') {
      let j = i, run = 0; while (j < n && src[j] === '`') { run++; j++; }
      const tick = '`'.repeat(run);
      // closing run must have exactly the same length as the opening run
      let close = -1, k = j;
      while (k < n) {
        if (src[k] === '`') {
          let r = 0; while (k + r < n && src[k + r] === '`') r++;
          if (r === run) { close = k; break; }
          k += r;
        } else k++;
      }
      if (close < 0) { pushText(tick); i = j; continue; }
      // a link takes precedence over a code span: if a ']' inside this
      // span would complete a link for an active '[' opener, the span
      // must not form (marked tokenizes the link first)
      let linkWins = false;
      for (let p = j; p < close; p++) { if (src[p] === ']' && linkFormsAtBracket(p)) { linkWins = true; break; } }
      if (linkWins) { pushText(tick); i = j; continue; }
      let content = src.slice(j, close);
      content = content.replace(/\r\n|\r|\n/g, ' ');
      if (content.length >= 2 && content[0] === ' ' && content[content.length - 1] === ' ' && content.trim() !== '') content = content.slice(1, -1);
      flushText();
      nodes.push({ k: 'c', s: content, t: run });
      i = close + run; continue;
    }
    if (c === '<') {
      const al = tryAutolink(src, i);
      if (al) {
        flushText();
        nodes.push({ k: 'link', href: al.href, title: null, auto: 'angle', ch: [{ k: 't', s: al.text }] });
        i = al.end; continue;
      }
      const tag = tryHtmlTag(src, i);
      if (tag) {
        flushText();
        if (!inLink && /^<a /i.test(tag)) inLink = true;
        else if (inLink && /^<\/a>/i.test(tag)) inLink = false;
        nodes.push({ k: 'h', s: tag }); i += tag.length; continue;
      }
      pushText('<'); i++; continue;
    }
    if (c === '&') {
      const ne = numericEntity(src, i);
      if (ne) { pushText(ne[0]); i = ne[1]; continue; }
      pushText('&'); i++; continue;
    }
    if (c === '!' && src[i + 1] === '[') { pendingImg = true; i++; continue; }
    if (c === '[') {
      flushText();
      nodes.push({ k: 'b', img: pendingImg, active: true, pos: i });
      pendingImg = false; i++; continue;
    }
    if (c === ']') {
      flushText();
      // find nearest active bracket opener
      let bi = -1;
      for (let j = nodes.length - 1; j >= 0; j--) { if (nodes[j].k === 'b' && nodes[j].active) { bi = j; break; } }
      if (bi < 0) { pushText(']'); i++; continue; }
      const opener = nodes[bi];
      const children = nodes.slice(bi + 1);
      // the label must match marked's label pattern: an unclosed
      // backtick (or other invalid label content) means no link forms
      // ([foo ` bar](...) stays literal, [at `a ` b`](...) likewise)
      if (!labelReachesBracket(src, opener.pos + 1, i)) {
        // a failed inline link also suppresses emphasis in its label
        if (src[i + 1] === '(') suppressLabelDelims(nodes, bi);
        opener.active = false;
        nodes.splice(bi, 0, { k: 't', s: opener.img ? '![' : '[' });
        nodes.splice(bi + 1, 1);
        pushText(']'); i++; continue;
      }
      let link = null, end = i + 1;
      const after = src[i + 1];
      if (after === '(') {
        const dt = parseDestTitle(src, i + 2, true);
        if (dt) { link = { dest: dt.dest, title: dt.title }; end = dt.end; }
        else {
          // not a valid inline link: fall back to a shortcut reference
          const ref = refs.get(normalizeLabel(plainText(children)));
          if (ref) link = ref;
        }
      } else if (after === '[') {
        // full or collapsed reference only: no shortcut fallback here
        const lab = scanLabel(src, i + 1);
        if (lab) {
          const ref = refs.get(normalizeLabel(lab.label));
          if (ref) { link = ref; end = lab.end; }
        }
        if (!link && src[i + 2] === ']') {
          const ref = refs.get(normalizeLabel(plainText(children)));
          if (ref) { link = ref; end = i + 3; }
        }
      } else {
        // shortcut reference
        const ref = refs.get(normalizeLabel(plainText(children)));
        if (ref) link = ref;
      }
      if (link) {
        // a link may not contain another link: if the text already has
        // one, this opener cannot form a link (images may contain links)
        if (!opener.img && containsLink(children)) {
          opener.active = false;
          nodes.splice(bi, 0, { k: 't', s: '[' });
          nodes.splice(bi + 1, 1);
          pushText(']'); i++; continue;
        }
        // deactivate bracket openers inside the link/image
        for (const ch of children) if (ch.k === 'b') ch.active = false;
        flushText();
        const kids = nodes.splice(bi);
        kids.shift(); // opener
        if (opener.img) {
          const altRaw = plainText(kids, true);
          nodes.push({ k: 'img', href: link.dest, title: link.title, altRaw });
        } else {
          stripExtAutolinks(kids);
          nodes.push({ k: 'link', href: link.dest, title: link.title, ch: kids });
        }
        // also deactivate any other openers that were inside? (done above)
        i = end; continue;
      }
      // no link: opener stays literal; mark it inactive so it cannot pair later
      // a failed inline link also suppresses emphasis in its label
      if (after === '(') suppressLabelDelims(nodes, bi);
      opener.active = false;
      nodes.splice(bi, 0, { k: 't', s: opener.img ? '![' : '[' });
      // remove the bracket node itself (now at bi+1)
      nodes.splice(bi + 1, 1);
      pushText(']'); i++; continue;
    }
    if (c === '*' || c === '_') {
      let j = i, run = 0; while (j < n && src[j] === c) { run++; j++; }
      const [left, right] = flanking(src, i, run);
      let open, close;
      if (c === '*') { open = left; close = right; }
      else { open = left && (!right || isUniPunct(src[i - 1] || '')); close = right && (!left || isUniPunct(src[i + run] || '')); }
      flushText();
      nodes.push({ k: 'd', c, n: run, open, close });
      i = j; continue;
    }
    if (c === '~') {
      let j = i, run = 0; while (j < n && src[j] === '~') { run++; j++; }
      if (run === 1 || run === 2) {
        const [left, right] = flanking(src, i, run);
        flushText();
        nodes.push({ k: 'd', c: '~', n: run, open: left, close: right });
      } else {
        pushText('~'.repeat(run));
      }
      i = j; continue;
    }
    // extended autolinks (suppressed while inside an '<a ' tag's span)
    if (!inLink && (c === 'w' || c === 'h' || c === 'f' || isAlnum(c))) {
      const ea = tryExtAutolink(src, i, nodes, linkFormsAtBracket);
      if (ea) {
        flushText();
        nodes.push({ k: 'link', href: ea.href, title: null, auto: 'ext', ch: [{ k: 't', s: ea.text }] });
        i = ea.end; continue;
      }
      pushText(c); i++; continue;
    }
    // two spaces before newline -> hard break is handled by scanning text:
    // when we meet '\n' we already emitted soft; check trailing spaces here instead:
    pushText(c); i++;
  }
  if (pendingImg) pushText('!');
  flushText();
  // hard breaks: a text node ending with 2+ spaces followed by a soft node
  for (let k = 0; k < nodes.length - 1; k++) {
    if (nodes[k].k === 't' && nodes[k + 1].k === 'soft') {
      const m = nodes[k].s.match(/ {2,}$/);
      if (m) {
        nodes[k].s = nodes[k].s.slice(0, -m[0].length);
        if (nodes[k].s === '') nodes.splice(k, 1);
        else k++;
        nodes.splice(k, 1, { k: 'br', nl: false });
      }
    }
  }
  // after a hard break, leading whitespace of the next line is stripped
  for (let k = 0; k < nodes.length - 1; k++) {
    if (nodes[k].k === 'br' && nodes[k + 1].k === 't') {
      nodes[k + 1].s = nodes[k + 1].s.replace(/^[ \t]+/, '');
      if (nodes[k + 1].s === '') nodes.splice(k + 1, 1);
    }
  }
  processEmphasis(nodes);
  return renderNodes(nodes);
}

// ---- block parsing ----
function indentInfo(line) {
  let col = 0, idx = 0;
  while (idx < line.length) {
    const c = line[idx];
    if (c === ' ') { col++; idx++; }
    else if (c === '\t') { col += 4 - (col % 4); idx++; }
    else break;
  }
  return [col, idx];
}
function stripCols(line, cols) {
  let col = 0, idx = 0;
  while (idx < line.length && col < cols) {
    const c = line[idx];
    if (c === ' ') { col++; idx++; }
    else if (c === '\t') { const adv = 4 - (col % 4); if (col + adv > cols) { return ' '.repeat(col + adv - cols) + line.slice(idx + 1); } col += adv; idx++; }
    else break;
  }
  return line.slice(idx);
}
function stripFenceIndent(line, cols) {
  let col = 0, idx = 0;
  while (idx < line.length && col < cols) {
    const c = line[idx];
    if (c === ' ') { col++; idx++; }
    else if (c === '\t') { const adv = 4 - (col % 4); if (col + adv > cols) { idx++; break; } col += adv; idx++; }
    else break;
  }
  return line.slice(idx);
}
function isBlank(line) { for (let i = 0; i < line.length; i++) { const c = line[i]; if (c !== ' ' && c !== '\t') return false; } return true; }
function trimLine(s) { return s.replace(/^[ \t]+/, '').replace(/[ \t]+$/, ''); }
function tryAtx(line) {
  const [col, idx] = indentInfo(line);
  if (col > 3) return null;
  let i = idx, n = 0;
  while (i < line.length && line[i] === '#') { n++; i++; }
  if (n === 0 || n > 6) return null;
  if (i >= line.length) return { level: n, text: '' };
  if (line[i] !== ' ' && line[i] !== '\t') return null;
  let text = line.slice(i).replace(/^[ \t]+/, '').replace(/[ \t]+$/, '');
  // closing sequence
  if (/^#+$/.test(text)) text = '';
  else {
    const m = text.match(/^(.*?)[ \t]+#+$/);
    if (m) text = m[1].replace(/[ \t]+$/, '');
  }
  return { level: n, text };
}
function tryThematic(line) {
  const [col, idx] = indentInfo(line);
  if (col > 3) return false;
  const s = line.slice(idx).replace(/[ \t]+$/, '');
  if (s.length < 3) return false;
  const ch = s[0];
  if (ch !== '*' && ch !== '-' && ch !== '_') return false;
  for (let i = 0; i < s.length; i++) { const c = s[i]; if (c !== ch && c !== ' ' && c !== '\t') return false; }
  let cnt = 0; for (let i = 0; i < s.length; i++) if (s[i] === ch) cnt++;
  return cnt >= 3;
}
function tryFence(line) {
  const [col, idx] = indentInfo(line);
  if (col > 3) return null;
  const ch = line[idx];
  if (ch !== '`' && ch !== '~') return null;
  let i = idx, n = 0;
  while (i < line.length && line[i] === ch) { n++; i++; }
  if (n < 3) return null;
  const info = line.slice(i).replace(/^[ \t]+/, '').replace(/[ \t]+$/, '');
  if (ch === '`' && info.indexOf('`') >= 0) return null;
  return { ch, len: n, indent: col, info };
}
function trySetext(line) {
  const [col, idx] = indentInfo(line);
  if (col > 3) return 0;
  const s = line.slice(idx).replace(/[ \t]+$/, '');
  if (s.length === 0) return 0;
  const ch = s[0];
  if (ch !== '=' && ch !== '-') return 0;
  for (let i = 0; i < s.length; i++) if (s[i] !== ch) return 0;
  return ch === '=' ? 1 : 2;
}
const BLOCK_TAGS = new Set(('address article aside base basefont blockquote body caption center col colgroup dd details dialog dir div dl dt fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hr html iframe legend li link main menu menuitem nav noframes ol optgroup option p param search section summary table tbody td tfoot th thead title tr track ul').split(' '));
function htmlBlockType(line, inPara) {
  const [col, idx] = indentInfo(line);
  if (col > 3) return 0;
  const s = line.slice(idx);
  const low = s.toLowerCase();
  if (/^<(script|pre|style|textarea)(\s|>|$)/.test(low)) return 1;
  if (s.startsWith('<!--')) return 2;
  if (s.startsWith('<?')) return 3;
  if (/^<![A-Za-z]/.test(s)) return 4;
  if (s.startsWith('<![CDATA[')) return 5;
  const m = s.match(/^<\/?([A-Za-z][A-Za-z0-9-]*)(\s|\/?>|$)/);
  if (m && BLOCK_TAGS.has(m[1].toLowerCase())) return 6;
  if (!inPara) {
    // type 7: a complete open tag (any attributes) or a closing tag
    // (no attributes), alone on the line
    const m2 = s.match(/^(?:<[A-Za-z][A-Za-z0-9-]*(?:\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>|<\/[A-Za-z][A-Za-z0-9-]*\s*>)[ \t]*$/);
    if (m2) return 7;
  }
  return 0;
}
function htmlBlockEnd(line, type) {
  const low = line.toLowerCase();
  if (type === 1) return /<\/(script|pre|style|textarea)/.test(low);
  if (type === 2) return line.indexOf('-->') >= 0;
  if (type === 3) return line.indexOf('?>') >= 0;
  if (type === 4) return line.indexOf('>') >= 0;
  if (type === 5) return line.indexOf(']]>') >= 0;
  return false; // 6,7 end at blank line
}
// Try to parse link reference definitions starting at lines[i]. Returns
// number of lines consumed, or 0. A definition may span up to 3 lines:
// label (possibly multi-line), destination, title.
function tryRefDef(lines, i, refs) {
  let j = i, consumed = 0;
  while (j < lines.length) {
    const line = lines[j];
    const [col, idx] = indentInfo(line);
    if (col > 3 || isBlank(line)) break;
    if (line[idx] !== '[') break;
    // join up to 8 lines so label/dest/title may span lines
    let joined = line;
    for (let e = 1; e <= 7 && j + e < lines.length; e++) joined += '\n' + lines[j + e];
    const lab = scanLabel(joined, idx);
    if (!lab) break;
    if (lab.label.indexOf('\n\n') >= 0 || lab.label.length > 999) break;
    const after = lab.end;
    if (joined[after] !== ':') break;
    const rest = joined.slice(after + 1);
    let dt = parseDestTitle(rest, 0, false);
    if (!dt) break;
    // title may be on the following line: retry with more of the joined text
    if (dt.title == null) {
      const dt2 = parseDestTitle(rest, 0, false);
      void dt2;
    }
    // parseDestTitle stops at the first title it finds on the same line or
    // the next line; if it found no title, the destination may still be
    // followed by a title on a later line within the joined text -- the
    // parser above already scans across newlines, so nothing more to do.
    const endIdx = lab.end + 1 + dt.end;
    const usedText = joined.slice(0, endIdx);
    const usedLines = usedText.split('\n').length;
    const restOfLine = joined.slice(endIdx).split('\n')[0];
    if (restOfLine.trim() !== '') break;
    const label = normalizeLabel(lab.label);
    if (label === '') break;
    if (!refs.has(label)) refs.set(label, { dest: dt.dest, title: dt.title });
    consumed += usedLines;
    j += usedLines;
  }
  return consumed;
}
function splitTableRow(line) {
  const cells = [];
  let cur = '', i = 0;
  // skip leading spaces
  while (i < line.length && (line[i] === ' ' || line[i] === '\t')) i++;
  const startsPipe = line[i] === '|';
  // marked splits on every unescaped '|': pipes inside code spans do
  // NOT protect the cell (``next` | delete splits into two cells)
  for (; i < line.length; i++) {
    const c = line[i];
    if (c === '\\' && i + 1 < line.length) {
      const nx = line[i + 1];
      if (nx === '|') { cur += '|'; i++; continue; } // escaped pipe: literal |
      if (nx === '`') { cur += '\\`'; i++; continue; } // escaped backtick
      if (nx === '\\') { cur += '\\\\'; i++; continue; } // escaped backslash
    }
    if (c === '|') { cells.push(cur); cur = ''; continue; }
    cur += c;
  }
  cells.push(cur);
  // drop edge empty cells for leading/trailing pipes
  let out = cells;
  if (startsPipe) out = out.slice(1);
  const trimmedEnd = line.replace(/[ \t]+$/, '');
  if (trimmedEnd.endsWith('|')) {
    // the last cell came from a trailing pipe; drop it if it is empty-ish
    if (out.length && trimLine(out[out.length - 1]) === '') out = out.slice(0, -1);
  }
  return out.map((s) => trimLine(s));
}
function tryTable(lines, i) {
  if (i + 1 >= lines.length) return null;
  const header = expandLeading(lines[i]);
  if (header.indexOf('|') < 0) return null;
  const delimLine = expandLeading(lines[i + 1]);
  const [dcol] = indentInfo(delimLine);
  if (dcol > 3) return null;
  const dCells = splitTableRow(delimLine);
  if (dCells.length === 0) return null;
  const aligns = [];
  for (const c of dCells) {
    if (/^:?-+:?$/.test(c)) aligns.push(c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : c.startsWith(':') ? 'left' : null);
    else return null;
  }
  const hCells = splitTableRow(header);
  if (hCells.length !== aligns.length) return null;
  const rows = [];
  let j = i + 2;
  while (j < lines.length) {
    // marked quirk: a line that is exactly one tab is an empty table
    // row (all cells empty), not a table terminator; any other blank
    // line ends the table
    if (lines[j] === '\t') { rows.push(new Array(aligns.length).fill('')); j++; continue; }
    const line = expandLeading(lines[j]);
    if (isBlank(line)) break;
    const [col] = indentInfo(line);
    if (col > 3) break;
    const t = trimLine(line);
    if (t.startsWith('>')) break;
    if (tryAtx(line) || tryFence(line) || tryThematic(line)) break;
    if (listMarkerInfo(line)) break;
    if (htmlBlockType(line, true) === 1 || htmlBlockType(line, true) === 2 || htmlBlockType(line, true) === 6) break;
    let cells = splitTableRow(line);
    while (cells.length < aligns.length) cells.push('');
    if (cells.length > aligns.length) cells = cells.slice(0, aligns.length);
    rows.push(cells);
    j++;
  }
  return { node: { t: 'table', aligns, header: hCells, rows }, next: j };
}

function isQuoteLine(line) {
  const [col, idx] = indentInfo(line);
  return col <= 3 && line[idx] === '>';
}
function stripQuoteLine(line) {
  const [col, idx] = indentInfo(line);
  let rest = line.slice(idx + 1);
  // Expand whitespace after '>' (column starts at col+1), then drop one space.
  let c = col + 1, out = '', k = 0;
  while (k < rest.length && (rest[k] === ' ' || rest[k] === '\t')) {
    if (rest[k] === ' ') { out += ' '; c++; k++; }
    else { const adv = 4 - (c % 4); out += ' '.repeat(adv); c += adv; k++; }
  }
  rest = out + rest.slice(k);
  if (rest.startsWith(' ')) rest = rest.slice(1);
  return rest;
}
function listMarkerInfo(line) {
  const [col, idx] = indentInfo(line);
  if (col > 3) return null;
  const ch = line[idx];
  if (ch === '-' || ch === '+' || ch === '*') {
    const nx = line[idx + 1];
    if (nx === undefined || nx === ' ' || nx === '\t') return { ordered: false, start: 0, delim: ch, markerLen: 1, indent: col, idx };
    return null;
  }
  if (isDigit(ch)) {
    let j = idx, num = '';
    while (j < line.length && isDigit(line[j]) && num.length < 9) { num += line[j]; j++; }
    if (num.length === 0) return null;
    const d = line[j];
    if (d !== '.' && d !== ')') return null;
    const nx = line[j + 1];
    if (nx === undefined || nx === ' ' || nx === '\t') return { ordered: true, start: parseInt(num, 10), delim: d, markerLen: j - idx + 1, indent: col, idx };
    return null;
  }
  return null;
}
function contentIndentFor(line, info) {
  const markerEndCol = info.indent + info.markerLen;
  let p = info.idx + info.markerLen, col = markerEndCol, out = '';
  while (p < line.length && (line[p] === ' ' || line[p] === '\t')) {
    if (line[p] === ' ') { out += ' '; col++; p++; }
    else { const adv = 4 - (col % 4); out += ' '.repeat(adv); col += adv; p++; }
  }
  const sp = col - markerEndCol;
  if (p >= line.length) return { contentIndent: markerEndCol + 1, first: '' };
  if (sp >= 5) return { contentIndent: markerEndCol + 1, first: out.slice(1) + line.slice(p) };
  return { contentIndent: col, first: line.slice(p) };
}
// Expand tabs to spaces in the leading whitespace run of a line only
// (tabs after the first content character stay literal, e.g. in code).
function expandLeading(line) {
  let col = 0, idx = 0, out = '';
  while (idx < line.length) {
    const c = line[idx];
    if (c === ' ') { out += ' '; col++; idx++; }
    else if (c === '\t') { const adv = 4 - (col % 4); out += ' '.repeat(adv); col += adv; idx++; }
    else break;
  }
  return idx === 0 ? line : out + line.slice(idx);
}
function isBlockStart(line) {
  const h = htmlBlockType(line, true);
  return !!(tryAtx(line) || tryFence(line) || tryThematic(line) || isQuoteLine(line) || listMarkerInfo(line) || (h >= 1 && h <= 6));
}
// a block start that a lazy continuation line cannot follow: a quote
// line CAN be lazily continued (the line goes into the quote's
// paragraph), but a fence opener / heading / list / HTML block cannot
function isNonLazyBlockStart(line) {
  const h = htmlBlockType(line, true);
  return !!(tryAtx(line) || tryFence(line) || tryThematic(line) || listMarkerInfo(line) || (h >= 1 && h <= 6));
}
function tryList(lines, term, i, refs, depth = 0, nb = null) {
  const info = listMarkerInfo(lines[i]);
  if (!info) return null;
  if (info.ordered === false && tryThematic(lines[i])) return null;
  const items = [];
  let j = i;
  let loose = false;
  let prevContentIndent = contentIndentFor(lines[i], info).contentIndent;
  let endTrailingBlanks = 0;
  while (j < lines.length) {
    if (tryThematic(lines[j])) break;
    const inf = listMarkerInfo(lines[j]);
    if (!inf || inf.ordered !== info.ordered || inf.delim !== info.delim || inf.indent >= prevContentIndent) break;
    const ci = contentIndentFor(lines[j], inf);
    const itemLines = [ci.first];
    const itemTerm = [term[j]];
    const itemNb = [nb && nb[j] ? true : false];
    let trailingBlanks = 0, internalBlank = false, blankBeforeNextItem = false;
    j++;
    while (j < lines.length) {
      const line = lines[j];
      if (isBlank(line)) {
        // peek next non-blank
        let k = j + 1;
        while (k < lines.length && isBlank(lines[k])) k++;
        if (k >= lines.length) { trailingBlanks += k - j; j = k; break; }
        // look past link reference definitions for a following same-list
        // item: a blank line before it still makes the list loose
        let k2 = k;
        while (k2 < lines.length) {
          while (k2 < lines.length && isBlank(lines[k2])) k2++;
          if (k2 >= lines.length) break;
          const dc = tryRefDef(lines, k2, new Map());
          if (dc > 0) { k2 += dc; continue; }
          break;
        }
        const ninf = k2 < lines.length ? listMarkerInfo(lines[k2]) : null;
        if (ninf && ninf.ordered === info.ordered && ninf.delim === info.delim && ninf.indent < prevContentIndent) { blankBeforeNextItem = true; trailingBlanks += k - j; j = k; break; }
        // an item with no content yet ends at a blank line
        const hasContent = itemLines.some(l => !isBlank(l));
        if (!hasContent) { trailingBlanks += k - j; j = k; break; }
        const [ncol] = indentInfo(lines[k]);
        if (ncol >= ci.contentIndent) {
          // blank lines are inside the item
          for (let b = j; b < k; b++) { itemLines.push(''); itemTerm.push(term[b]); itemNb.push(false); }
          internalBlank = true;
          j = k; continue;
        }
        trailingBlanks += k - j; j = k; break;
      }
      const [col] = indentInfo(line);
      const el = expandLeading(line);
      const ninf2 = listMarkerInfo(el);
      if (ninf2 && ninf2.ordered === info.ordered && ninf2.delim === info.delim && ninf2.indent < ci.contentIndent) break;
      if (col >= ci.contentIndent) { itemLines.push(stripCols(el, ci.contentIndent)); itemTerm.push(term[j]); itemNb.push(nb && nb[j] ? true : false); trailingBlanks = 0; j++; continue; }
      // lazy continuation: previous item line non-blank, and the line does
      // not start a new block; append it to the previous item line so it
      // stays paragraph text. A lazy line keeps its leading spaces when
      // indented < 4 columns, but 4+ columns of indent are stripped
      // (the indented-code threshold): cm-291 strips 4, doc-22 keeps 3.
      // It must only continue a paragraph: if the previous line itself
      // starts a block (e.g. a fence opener) the line is not part of
      // the item at all (doc-17: '```toml' must not swallow the next line)
      if (itemLines.length > 0 && !isBlank(itemLines[itemLines.length - 1]) && !isNonLazyBlockStart(itemLines[itemLines.length - 1]) && !isBlockStart(el)) {
        itemLines[itemLines.length - 1] += '\n' + (col >= 4 ? stripCols(el, 4) : el);
        itemTerm[itemTerm.length - 1] = term[j]; trailingBlanks = 0; j++; continue;
      }
      break;
    }
    // strip trailing blank lines from item
    let tl = itemLines.length;
    while (tl > 0 && isBlank(itemLines[tl - 1])) tl--;
    itemLines.length = tl; itemTerm.length = tl; itemNb.length = tl;
    if (blankBeforeNextItem) loose = true;
    // task list marker on first content line
    let task = false, checked = false;
    if (itemLines.length > 0) {
      const m = itemLines[0].match(/^\[( |x|X)\](?:[ \t]+|$)/);
      if (m) { task = true; checked = m[1] === 'x' || m[1] === 'X'; itemLines[0] = itemLines[0].slice(m[0].length); }
    }
    const children = parseBlocks(itemLines, itemTerm, refs, depth + 1, itemNb, true);
    if (children.blankSep) loose = true;
    items.push({ task, checked, children });
    prevContentIndent = ci.contentIndent;
    endTrailingBlanks = trailingBlanks;
    // loop continues at j (next item or end)
    if (j >= lines.length) break;
    // skip blank lines and link reference definitions to find the next item
    // (defs are registered into refs: they are document-global)
    let nj = j;
    while (nj < lines.length) {
      while (nj < lines.length && isBlank(lines[nj])) nj++;
      if (nj >= lines.length) break;
      const dc = tryRefDef(lines, nj, refs);
      if (dc > 0) { nj += dc; continue; }
      break;
    }
    if (nj > j) endTrailingBlanks = Math.max(endTrailingBlanks, 1);
    if (nj >= lines.length) { j = nj; break; }
    const ninf = listMarkerInfo(lines[nj]);
    if (!ninf || ninf.ordered !== info.ordered || ninf.delim !== info.delim || ninf.indent >= prevContentIndent) { j = nj; break; }
    j = nj;
  }
  return { node: { t: 'list', ordered: info.ordered, start: info.start, tight: !loose, items }, next: j, trailingBlank: endTrailingBlanks > 0 && j < lines.length };
}
function parseBlocks(lines, term, refs, depth = 0, nb = null, inItem = false) {
  const nodes = [];
  let i = 0, pendingBlank = false, blankSep = false;
  while (i < lines.length) {
    const line = expandLeading(lines[i]);
    if (isBlank(line) && !(nb && nb[i])) { if (nodes.length > 0) pendingBlank = true; i++; continue; }
    const defConsumed = tryRefDef(lines, i, refs);
    if (defConsumed > 0) { i += defConsumed; continue; }
    if (pendingBlank && nodes.length > 0) { blankSep = true; pendingBlank = false; }
    const atx = tryAtx(line);
    if (atx) { nodes.push({ t: 'heading', level: atx.level, text: atx.text }); i++; continue; }
    if (tryThematic(line)) { nodes.push({ t: 'hr' }); i++; continue; }
    const fence = tryFence(line);
    if (fence) {
      const content = [];
      let j = i + 1, closed = false;
      while (j < lines.length) {
        const l = lines[j];
        const [c2, idx2] = indentInfo(l);
        if (c2 <= 3 && l[idx2] === fence.ch) {
          let k = idx2, cnt = 0; while (k < l.length && l[k] === fence.ch) { cnt++; k++; }
          if (cnt >= fence.len && trimLine(l.slice(k)) === '') { closed = true; break; }
        }
        // fenced code: backtick fences strip up to fence.indent columns
        // from each content line (a tab straddling the boundary is
        // removed whole); TILDE fences do NOT dedent at all — marked
        // keeps the full indent on every content line of a ~~~ fence
        content.push(fence.ch === '~' ? l : stripFenceIndent(l, fence.indent));
        j++;
      }
      // marked's fences regex captures the content as the lines joined
      // by '\n' (no trailing terminator); the renderer strips one
      // trailing '\n' and adds one back (empty stays empty)
      const text = content.join('\n');
      nodes.push({ t: 'code', lang: fence.info === '' ? null : (fence.info.search(/[ \t]/) < 0 ? fence.info : fence.info.slice(0, fence.info.search(/[ \t]/))), text });
      i = closed ? j + 1 : j;
      continue;
    }
    const [icol] = indentInfo(line);
    if (icol >= 4) {
      const content = [];
      let j = i, lastContent = -1;
      while (j < lines.length) {
        // use the raw line: a tab in the indent must survive as a tab
        const l = lines[j];
        if (isBlank(l)) {
          let k = j + 1;
          while (k < lines.length && isBlank(lines[k])) k++;
          if (k < lines.length && indentInfo(lines[k])[0] >= 4) { for (let b = j; b < k; b++) content.push(stripCols(lines[b], 4)); j = k; continue; }
          break;
        }
        if (indentInfo(l)[0] >= 4) { content.push(stripCols(l, 4)); lastContent = j; j++; continue; }
        break;
      }
      // strip trailing blank lines
      while (content.length > 0 && content[content.length - 1] === '') content.pop();
      let text = content.join('\n');
      if (content.length > 0 && term[lastContent]) text += '\n';
      nodes.push({ t: 'code', lang: null, text });
      i = j;
      continue;
    }
    const ht = htmlBlockType(line, false);
    if (ht) {
      const content = [line];
      let j = i + 1, endedAtBlank = false;
      // types 1-5 end at a line containing the closing marker, blank lines
      // included; types 6-7 end at a blank line
      if (!(ht <= 5 && htmlBlockEnd(line, ht))) {
        while (j < lines.length) {
          const l = lines[j];
          if (ht <= 5) {
            content.push(l);
            if (htmlBlockEnd(l, ht)) { j++; break; }
            j++; continue;
          }
          if (isBlank(l)) { endedAtBlank = true; break; }
          content.push(l); j++;
        }
      }
      let text = content.join('\n');
      // trailing newline unless followed by a blank line, or the block
      // is the last thing in a sub-document (blockquote / list item)
      if (content.length > 0 && term[j - 1] && !endedAtBlank && (depth === 0 || j < lines.length) && !(j < lines.length && lines[j] === '')) text += '\n';
      nodes.push({ t: 'html', text });
      i = j;
      continue;
    }
    const tbl = tryTable(lines, i);
    if (tbl) { nodes.push(tbl.node); i = tbl.next; continue; }
    if (isQuoteLine(line)) {
      const sub = [], subTerm = [], subNb = [];
      let j = i;
      while (j < lines.length) {
        const l = lines[j];
        if (isQuoteLine(l)) {
          const stripped = stripQuoteLine(l);
          sub.push(stripped); subTerm.push(term[j]);
          // a stripped line that is only spaces (from '>  ') is not blank,
          // but only when it continues a paragraph (previous line is a
          // paragraph line); otherwise it is a blank separator
          let nbFlag = false;
          if (stripped.length > 0 && isBlank(stripped) && sub.length > 1) {
            const prev = innerLine(sub[sub.length - 2]);
            nbFlag = !isBlank(prev) && !isBlockStart(prev) && !tryFence(prev);
          }
          subNb.push(nbFlag);
          j++; continue;
        }
        if (isBlank(l)) {
          // a blank line with no '>' marker ends the blockquote
          break;
        }
        if (canLazy(sub) && !isBlockStart(l)) {
          // a lazy line cannot start a new block: append it to the
          // previous sub-line so it stays paragraph text
          const [col] = indentInfo(l);
          const add = trySetext(l) ? '    ' + l : (col >= 4 ? stripCols(expandLeading(l), 4) : l);
          sub[sub.length - 1] += '\n' + add;
          subTerm[subTerm.length - 1] = term[j]; j++; continue;
        }
        break;
      }
      nodes.push({ t: 'quote', children: parseBlocks(sub, subTerm, refs, depth + 1, subNb, inItem) });
      i = j;
      continue;
    }
    const lst = tryList(lines, term, i, refs, depth, nb);
    if (lst) {
      nodes.push(lst.node);
      if (lst.trailingBlank) pendingBlank = true;
      i = lst.next; continue;
    }
    // paragraph (possibly setext heading)
    const plines = [line];
    let j = i + 1, setextLevel = 0;
    while (j < lines.length) {
      const l = expandLeading(lines[j]);
      if (isBlank(l) && !(nb && nb[j])) break;
      const st = trySetext(l);
      if (st) { setextLevel = st; break; }
      if (tryAtx(l) || tryFence(l) || tryThematic(l)) break;
      const h2 = htmlBlockType(l, true);
      if (h2 >= 1 && h2 <= 6) break;
      if (isQuoteLine(l)) break;
      const lm = listMarkerInfo(l);
      if (lm) {
        const ci = contentIndentFor(l, lm);
        // an ordered list interrupts a paragraph only from 1, except
        // inside a list item where any start number interrupts
        if (ci.first !== '' && (!lm.ordered || lm.start === 1 || inItem)) break;
      }
      plines.push(l); j++;
    }
    if (setextLevel) {
      const headingText = plines.join('\n').replace(/^[ \t\n]+/, '').replace(/[ \t\n]+$/, '');
      nodes.push({ t: 'heading', level: setextLevel, text: headingText });
      i = j + 1;
    } else {
      nodes.push({ t: 'para', lines: plines });
      i = j;
    }
  }
  nodes.blankSep = blankSep;
  return nodes;
}
function renderBlocks(nodes, refs, tight) {
  let out = '';
  for (const n of nodes) {
    if (n.t === 'para') {
      const inner = parseInline(n.lines.join('\n'), refs);
      out += tight ? inner : '<p>' + inner + '</p>\n';
    } else if (n.t === 'heading') {
      out += '<h' + n.level + '>' + parseInline(n.text, refs) + '</h' + n.level + '>\n';
    } else if (n.t === 'hr') {
      out += '<hr>\n';
    } else if (n.t === 'code') {
      const r = n.text ? n.text.replace(/\n$/, '') + '\n' : '';
      out += '<pre><code' + (n.lang ? ' class="language-' + escAttr(unescapeStr(n.lang)) + '"' : '') + '>' + escAll(r) + '</code></pre>\n';
    } else if (n.t === 'html') {
      out += n.text;
    } else if (n.t === 'quote') {
      out += '<blockquote>\n' + renderBlocks(n.children, refs, false) + '</blockquote>\n';
    } else if (n.t === 'table') {
      out += '<table>\n<thead>\n<tr>\n';
      for (let c = 0; c < n.header.length; c++) {
        const a = n.aligns[c];
        out += '<th' + (a ? ' align="' + a + '"' : '') + '>' + parseInline(n.header[c], refs) + '</th>\n';
      }
      out += '</tr>\n</thead>\n';
      if (n.rows.length > 0) {
        out += '<tbody>';
        for (const row of n.rows) {
          out += '<tr>\n';
          for (let c = 0; c < row.length; c++) {
            const a = n.aligns[c];
            out += '<td' + (a ? ' align="' + a + '"' : '') + '>' + parseInline(row[c], refs) + '</td>\n';
          }
          out += '</tr>\n';
        }
        out += '</tbody>';
      }
      out += '</table>\n';
    } else if (n.t === 'list') {
      out += n.ordered ? '<ol' + (n.start !== 1 ? ' start="' + n.start + '"' : '') + '>\n' : '<ul>\n';
      for (const item of n.items) {
        out += '<li>';
        const checkbox = item.task ? (item.checked ? '<input checked="" disabled="" type="checkbox"> ' : '<input disabled="" type="checkbox"> ') : '';
        const rendered = renderBlocks(item.children, refs, n.tight);
        if (checkbox && !n.tight && item.children.length > 0 && item.children[0].t === 'para') {
          // in a loose list the checkbox goes inside the first paragraph
          const pIdx = rendered.indexOf('<p>');
          out += pIdx >= 0 ? rendered.slice(0, pIdx + 3) + checkbox + rendered.slice(pIdx + 3) : checkbox + rendered;
        } else {
          out += checkbox + rendered;
        }
        out += '</li>\n';
      }
      out += n.ordered ? '</ol>\n' : '</ul>\n';
    }
  }
  return out;
}
export function parse(markdown) {
  // marked's lexer state.inLink persists across the whole document:
  // an unclosed '<a ' tag suppresses every later extended autolink
  inLink = false;
  const src = String(markdown).replace(/\r\n?/g, '\n');
  const lines = src.split('\n');
  let term;
  if (src.endsWith('\n')) { lines.pop(); term = lines.map(() => true); }
  else { term = lines.map(() => true); term[term.length - 1] = false; }
  if (lines.length === 1 && lines[0] === '') return '';
  const refs = new Map();
  const nodes = parseBlocks(lines, term, refs);
  return renderBlocks(nodes, refs, false);
}

// A lazy blockquote continuation line may only continue a paragraph:
// not a fenced-code block, not an indented-code line, not another block.
// Looks through nested quote markers and list-item markers to the
// innermost content line.
function innerLine(line) {
  let l = line;
  for (;;) {
    if (isQuoteLine(l)) { l = stripQuoteLine(l); continue; }
    const inf = listMarkerInfo(l);
    if (inf) {
      l = contentIndentFor(l, inf).first;
      continue;
    }
    return l;
  }
}
function canLazy(sub) {
  if (sub.length === 0) return false;
  let inFence = null, fenceDepth = 0;
  for (const l of sub) {
    // quote depth of this sub-line (leading '>' markers)
    let d = 0, s = l;
    while (isQuoteLine(s)) { d++; s = stripQuoteLine(s); }
    // a fence opened inside a nested quote closes when that quote
    // ends (a later line with fewer '>' markers), even though no
    // closing fence line appears (doc-21: the ```rust fence inside
    // '> >' ends at '> request ...', so 'fast npm more' is lazy)
    if (inFence && d < fenceDepth) inFence = null;
    const il = innerLine(l);
    if (isBlank(il)) continue;
    const f = tryFence(il);
    if (f) {
      if (inFence && f.ch === inFence.ch && f.len >= inFence.len) inFence = null;
      else if (!inFence) { inFence = f; fenceDepth = d; }
    }
  }
  if (inFence) return false;
  const last = innerLine(sub[sub.length - 1]);
  if (isBlank(last)) return false;
  if (indentInfo(last)[0] >= 4) return false;
  if (isBlockStart(last)) return false;
  return true;
}
