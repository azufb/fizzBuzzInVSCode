// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "fizzbuzzinvscode" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'fizzbuzzinvscode',
    async function () {
      // The code you place here will be executed every time your command is executed

      // inputBoxを表示させ、ユーザに入力を促す。
      let userInput = await vscode.window.showInputBox({
        placeHolder: '好きな数字を入力してください。',
      });

      // 文字列型のuserInputの値を数値型に変更。数値型にできないような文字列であれば、NaNになる。
      // 何も入力されなかった場合、limitNumには代入しない。
      let limitNum;
      if (userInput !== undefined) {
        limitNum = Number(userInput);
      }

      // limitNumが、数字ではない場合は実行しない。
      if (Number.isNaN(limitNum)) {
        vscode.window.showErrorMessage(
          '数字以外が指定されています。再度実行し直してください。'
        );
      } else {
        // 小数点数であれば、整数に直す。切り捨て。
        if (!Number.isInteger(limitNum)) {
          limitNum = Math.trunc(limitNum);
        }

        // 負の数は受け付けたくないので、負の数であれば、マイナスの符号を取り除き、絶対値を返す。
        if (Math.sign(limitNum) === -1) {
          limitNum = Math.abs(limitNum);
        }

        let n = 0;
        // FizzBuzz in VSCode!用に出力場所を用意。
        let outputArea = vscode.window.createOutputChannel('FizzBuzz');
        while (n <= limitNum) {
          if (n % 15 === 0) {
            // 引数に与えた値と行を出力場所に追加。
            outputArea.appendLine(`${n}: FizzBuzz`);
          } else if (n % 5 === 0) {
            outputArea.appendLine(`${n}: Buzz`);
          } else if (n % 3 === 0) {
            outputArea.appendLine(`${n}: Fizz`);
          } else {
            outputArea.appendLine(`${n}`);
          }
          n++;
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
