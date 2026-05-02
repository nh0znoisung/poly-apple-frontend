/**
 * Unit tests for InputParser validation logic.
 * Run: node parser.test.js
 *
 * IMPORTANT: The InputParser class below must stay in sync with
 * the one defined in public/script.js. When you modify validation
 * logic in script.js, update the class here too before running tests.
 */

// ─── InputParser (copy from public/script.js) ────────────────────────────────

class InputParser {
    static parse(input, gridSize = 10) {
        if (!input || typeof input !== 'string') throw new Error('Invalid input');

        const norm = input.trim().toLowerCase().replace(/\s+/g, '');

        if (/^x=(-?\d+\.?\d*)$/.test(norm)) {
            throw new Error('x = constant not supported — use y = f(x) instead');
        }

        const m = norm.match(/^y=(.+)$/);
        if (!m) throw new Error('Format: y = f(x)');

        // Implicit multiplication: "2x" → "2*x", "3x^2" → "3*x^2"
        const expr = m[1].replace(/(\d)(x)/g, '$1*x');

        if (/[()]/.test(expr)) {
            throw new Error('Parentheses are forbidden — expand the expression manually');
        }

        if (/\//.test(expr)) {
            throw new Error('Division is forbidden — use integer polynomial coefficients only');
        }

        if (/\d\.\d|\.\d/.test(expr)) {
            throw new Error('Decimal numbers are forbidden — use integer coefficients only');
        }

        if (/\^-/.test(expr)) {
            throw new Error('Negative exponents are forbidden');
        }

        if (/\^[^0-9]/.test(expr)) {
            throw new Error('Exponent must be a non-negative integer (e.g. x^3), not a variable');
        }

        if (!/^[\dx+\-*^]+$/i.test(expr)) {
            throw new Error('Only numbers, x, and operators ( + − * ^ ) are allowed');
        }

        const expTokens = expr.match(/\^(\d+)/g) || [];
        for (const tok of expTokens) {
            const exp = parseInt(tok.slice(1), 10);
            if (exp > 10) {
                throw new Error(`Exponent ^${exp} exceeds the maximum degree of 10`);
            }
        }

        const numLiterals = expr.match(/\d+/g) || [];
        for (const n of numLiterals) {
            if (parseInt(n, 10) > 1_000_000_000) {
                throw new Error(`Coefficient ${n} exceeds the maximum |aᵢ| ≤ 10⁹`);
            }
        }

        const jsExpr = expr.replace(/\^/g, '**');

        let evalFn;
        try {
            evalFn = new Function('x', `"use strict"; return (${jsExpr});`);
            const test = evalFn(1);
            if (typeof test !== 'number' || !isFinite(test)) throw new Error('non-finite result');
        } catch(e) {
            throw new Error('Cannot evaluate expression — check syntax');
        }

        const degree = InputParser.detectDegree(evalFn);
        if (degree > 10) {
            throw new Error('Degree exceeds 10 — reduce the total degree of your polynomial');
        }

        const points = InputParser.getCurvePoints(evalFn, gridSize);
        return { type: 'polynomial', evalFn, expr: input.trim(), degree, isValid: true, points };
    }

    static detectDegree(evalFn) {
        try {
            let vals = [];
            for (let i = 0; i <= 15; i++) vals.push(evalFn(i));
            for (let n = 0; n <= 14; n++) {
                const range = Math.max(...vals) - Math.min(...vals);
                if (range < 1e-6) return n;
                const scale = Math.max(...vals.map(v => Math.abs(v)));
                if (range / scale < 1e-5) return n;
                const next = [];
                for (let i = 1; i < vals.length; i++) next.push(vals[i] - vals[i - 1]);
                vals = next;
                if (vals.length === 0) return n;
            }
        } catch(e) { /* fall through */ }
        return 15;
    }

    static getCurvePoints(evalFn, gridSize = 10) {
        const pts = [];
        const xMin = -1, xMax = gridSize;
        const steps = Math.max(400, gridSize * 30);
        for (let i = 0; i <= steps; i++) {
            const x = xMin + ((xMax - xMin) / steps) * i;
            try {
                const y = evalFn(x);
                pts.push(isFinite(y) ? { x, y } : null);
            } catch(e) { pts.push(null); }
        }
        return pts;
    }
}

// ─── Minimal test runner ──────────────────────────────────────────────────────

let passed = 0, failed = 0;

function ok(name, fn) {
    try {
        fn();
        console.log(`  ✓  ${name}`);
        passed++;
    } catch (e) {
        console.error(`  ✗  ${name}`);
        console.error(`       ${e.message}`);
        failed++;
    }
}

function assertPasses(expr, label) {
    ok(label || `PASS: ${expr}`, () => {
        const result = InputParser.parse(expr);
        if (!result.isValid) throw new Error('Expected isValid=true');
    });
}

function assertFails(expr, expectedSnippet, label) {
    ok(label || `FAIL: ${expr}`, () => {
        try {
            InputParser.parse(expr);
            throw new Error('Expected an error but none was thrown');
        } catch (e) {
            if (expectedSnippet && !e.message.toLowerCase().includes(expectedSnippet.toLowerCase())) {
                throw new Error(`Expected error containing "${expectedSnippet}", got: "${e.message}"`);
            }
        }
    });
}

function assertDegree(expr, expectedDeg, label) {
    ok(label || `degree(${expr}) == ${expectedDeg}`, () => {
        const result = InputParser.parse(expr);
        if (result.degree !== expectedDeg) {
            throw new Error(`Expected degree ${expectedDeg}, got ${result.degree}`);
        }
    });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log('\n── Valid expressions ──');
assertPasses('y = x^2',           'basic quadratic');
assertPasses('y = x^10',          'max degree 10');
assertPasses('y = x^0',           'x^0 = constant 1');
assertPasses('y = 0',             'zero polynomial');
assertPasses('y = 5',             'nonzero constant');
assertPasses('y = x',             'linear');
assertPasses('y = -x + 5',        'negative leading term');
assertPasses('y = x^8 + x^8',     'repeated terms (free repetition)');
assertPasses('y = x^3*2 + x^8',   'coefficient after x^n (free ordering)');
assertPasses('y = 1000000000*x',  'max coefficient 10^9');
assertPasses('y = -1000000000*x^10', 'max magnitude negative coefficient');
assertPasses('y = x^2 + 2*x + 1', 'standard quadratic with explicit *');
assertPasses('y = x^5 - 3*x^3 + x - 1', 'multi-term polynomial');
assertPasses('y = x^10 + x^10',   'repeated max-degree terms');

console.log('\n── Implicit multiplication (2x → 2*x) ──');
assertPasses('y = 2x',            'implicit: 2x');
assertPasses('y = 3x^2',          'implicit: 3x^2');
assertPasses('y = 10x^5 + 5x - 1','implicit: multi-term');
assertPasses('y = 2x^3 + x^2',   'implicit: mixed implicit and plain x');
assertDegree('y = 3x^2 + 2x + 1', 2, 'implicit: degree of classic quadratic');
assertDegree('y = 5x',            1, 'implicit: degree of 5x');

console.log('\n── Degree detection ──');
assertDegree('y = 5',      0, 'degree of constant = 0');
assertDegree('y = x',      1, 'degree of x = 1');
assertDegree('y = x^2',    2, 'degree of x^2 = 2');
assertDegree('y = x^10',  10, 'degree of x^10 = 10');
assertDegree('y = x^8 + x^8', 8, 'repeated terms: degree still 8');

console.log('\n── RULE: No parentheses ──');
assertFails('y = (x-1)^9 - 1',        'parenthes', 'parentheses in expression');
assertFails('y = (x+1)*(x^3+1)',       'parenthes', 'product of binomials');
assertFails('y = (1+2)*x',             'parenthes', 'grouped coefficient');
assertFails('y = sin(x)',              'parenthes', 'function call via parens');
assertFails('y = (x)',                 'parenthes', 'bare parenthesised x');

console.log('\n── RULE: No division ──');
assertFails('y = x/2',    'division', 'division by 2');
assertFails('y = 1/x',    'division', 'rational 1/x');
assertFails('y = x^2/3',  'division', 'division by 3');

console.log('\n── RULE: Integer coefficients only (no decimals) ──');
assertFails('y = 2.5*x',  'decimal', 'decimal coefficient 2.5');
assertFails('y = 0.5*x^2','decimal', 'decimal coefficient 0.5');
assertFails('y = x + 1.0','decimal', 'trailing .0 decimal');

console.log('\n── RULE: Degree ≤ 10 ──');
assertFails('y = x^11',          'degree',  'explicit degree 11');
assertFails('y = x^100',         'degree',  'explicit degree 100');
assertFails('y = x^5 * x^7',    'degree',  'composed degree 12 via multiplication');
assertFails('y = x^10 * x^2',   'degree',  'composed degree 12 (10+2)');

console.log('\n── RULE: |coefficient| ≤ 10^9 ──');
assertFails('y = 1000000001*x',  '10',      'coefficient 10^9 + 1');
assertFails('y = 9999999999*x',  '10',      'coefficient 10 billion');

console.log('\n── RULE: No negative exponents ──');
assertFails('y = x^-2',  'negative exponent', 'negative exponent x^-2');
assertFails('y = x^-1',  'negative exponent', 'negative exponent x^-1');

console.log('\n── RULE: Exponent must be integer (no x^x) ──');
assertFails('y = x^x',  'exponent', 'variable exponent x^x');

console.log('\n── Format validation ──');
assertFails('x^2 + 1',   'format',   'missing y= prefix');
assertFails('y = ',       'format',   'empty right-hand side');  // matches via m===null
assertFails('',           'invalid',  'empty string');
assertFails('y = x = 1', 'operators', 'double equals — caught by char whitelist');

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(40)}`);
console.log(`  ${passed} passed, ${failed} failed`);
console.log('─'.repeat(40));
if (failed > 0) process.exit(1);
