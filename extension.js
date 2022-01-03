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
        placeHolder: '1以上の好きな数字を入力してください。',
      });

      // 文字列型のuserInputの値を数値型に変更。数値型にできないような文字列であれば、NaNになる。
      // 何も入力されなかった場合、maxNumには代入しない。
      let maxNum;
      if (userInput !== undefined) {
        maxNum = Number(userInput);
      }

      // maxNumが、数字ではない場合は実行しない。
      if (Number.isNaN(maxNum) || Math.sign(maxNum) === -1 || maxNum < 1) {
        vscode.window.showErrorMessage(
          '無効な値です。(無効な値：数字以外・負の数・1未満の数)'
        );
      } else {
        // 小数点以下は、取り除き、整数部のみにする。
        if (!Number.isInteger(maxNum)) {
          Math.trunc(maxNum);
        }

        // FizzBuzzは1からスタート。
        let n = 1;
        // 出力場所を用意。
        let outputArea = vscode.window.createOutputChannel('FizzBuzz');
        while (n <= maxNum) {
          if (n % 15 === 0) {
            // 引数に与えた値と行を出力場所に追加。
            outputArea.appendLine(`Fizz Buzz`);
          } else if (n % 5 === 0) {
            outputArea.appendLine(`Buzz`);
          } else if (n % 3 === 0) {
            outputArea.appendLine(`Fizz`);
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
