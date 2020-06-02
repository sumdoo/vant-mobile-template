function output(className, prop, end, start = 0) {
    const props = Array.isArray(prop) ? prop : [prop];
    for (let i = start; i <= end; i++) {
        let value = '';
        for (let j = 0; j < props.length; j++) {
            value += value ? ` ${props[j]}: ${i}px;` : `${props[j]}: ${i}px;`;
        }
        console.log(`.${className}${i} { ${value} };`);
    }
}

/** width */
output('w', 'width', 50);

/** height */
output('h', 'height', 50);

// /** font-size */
// output('f', 'font-size', 35);

// /** border-radius */
// output('br', 'border-radius', 20);

// /** line-height */
// output('lh', 'line-height', 50);

// /** margin */
// output('m', 'margin', 50);
// output('mt', 'margin-top', 50);
// output('mb', 'margin-bottom', 50);
// output('ml', 'margin-left', 50);
// output('mr', 'margin-right', 50);
// output('mlr', ['margin-left', 'margin-right'], 50);
// output('mtb', ['margin-top', 'margin-bottom'], 50);
// output('mlt', ['margin-left', 'margin-top'], 50);
// output('mlb', ['margin-left', 'margin-bottom'], 50);
// output('mrt', ['margin-right', 'margin-top'], 50);
// output('mrb', ['margin-right', 'margin-bottom'], 50);

// /** padding */
// output('p', 'padding', 50);
// output('pt', 'padding-top', 50);
// output('pb', 'padding-bottom', 50);
// output('pl', 'padding-left', 50);
// output('pr', 'padding-right', 50);
// output('plr', ['padding-left', 'padding-right'], 50);
// output('ptb', ['padding-top', 'padding-bottom'], 50);
// output('plt', ['padding-left', 'padding-top'], 50);
// output('plb', ['padding-left', 'padding-bottom'], 50);
// output('prt', ['padding-right', 'padding-top'], 50);
// output('prb', ['padding-right', 'padding-bottom'], 50);
