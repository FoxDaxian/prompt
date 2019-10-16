const readline = require('readline');

function prompt(questions) {
    const input = process.stdin;
    const output = process.stdout;
    const result = {};
    const interface = readline.createInterface({
        input,
        output
    });

    // input
    // interface.question('你好吗?', answer => {
    //     console.log(answer);
    // });

    // select

    let curSelect = 0;
    const selectSymbol = '>';
    const lists = ['红的', '绿的', '黄的'];
    const len = lists.length;

    interface.question('请选择: \n', () => {
        interface.on('enterEmit', value => {
            console.log('结果为: ', value);
        });
    });

    drawSelect(lists, curSelect, selectSymbol);
    readline.emitKeypressEvents(input);
    input.on('keypress', keypress);
    function keypress(keyValue, keyInfo) {
        if (typeof keyValue !== 'undefined') {
            output.moveCursor(input, -keyValue.length);
            output.clearScreenDown(input);
        }

        switch (keyInfo.name) {
            case 'up':
                curSelect = (curSelect - 1) % len;
                break;
            case 'down':
                curSelect = (curSelect + 1) % len;
                break;
            case 'return':
                input.off('keypress', keypress);
                output.moveCursor(0, -len);
                output.clearScreenDown(input);
                interface.emit(
                    'enterEmit',
                    lists[curSelect >= 0 ? curSelect : len + curSelect]
                );
                return;
                break;
            default:
        }
        output.moveCursor(0, -len);
        output.clearScreenDown(input);
        drawSelect(
            lists,
            curSelect >= 0 ? curSelect : len + curSelect,
            selectSymbol
        );
    }
}

function drawSelect(lists, curSelect, selectSymbol) {
    lists.forEach((item, index) => {
        process.stdout.write(
            `${curSelect === index ? selectSymbol : ' '} ${item}\n`
        );
    });
}

prompt();
