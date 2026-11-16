// Harness driver: render every case in /input/cases.json with parse
// from parse.js and write the HTML strings, in order, to
// /output/html.json. Outside a container, MAKEFUN_INPUT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /input and /output.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

type Case = { id: string; markdown: string };

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as Case[];
const html: string[] = new Array(cases.length);
for (let k = 0; k < cases.length; k++) html[k] = parse(cases[k].markdown);
writeFileSync(join(OUTPUT_DIR, 'html.json'), JSON.stringify(html));
