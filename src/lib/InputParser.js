export class InputParser {
    static parse(input, gridSize = 10) {
        if (!input || typeof input !== 'string') throw new Error('Invalid input');

        const norm = input.trim().toLowerCase().replace(/\s+/g, '');

        if (/^x=(-?\d+\.?\d*)$/.test(norm)) {
            throw new Error('x = constant not supported — use y = f(x) instead');
        }

        const m = norm.match(/^y=(.+)$/);
        if (!m) throw new Error('Format: y = f(x)');

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
            if (exp > 10) throw new Error(`Exponent ^${exp} exceeds the maximum degree of 10`);
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
            // eslint-disable-next-line no-new-func
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
