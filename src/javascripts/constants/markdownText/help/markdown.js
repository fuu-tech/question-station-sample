/* eslint-disable max-len */

export const markdownText = `## Markdown、Katexについて
本サービスのいくつか箇所ではMarkdownの記法とKatexによる数式入力が可能です。

### Markdown
Markdownを用いることにより、本ヘルプの各ページのような表記が可能となります。
なお、Markdown記法においてHTMLタグの使用はできません。

Markdownの記法ついて詳しく知りたい方は、下記リンクを参照ください。
[Markdown Guide 基本文法](https://www.markdownguide.org/basic-syntax/)

### Katex
数字やアルファベットはそのまま入力することができますが、特殊な算術記号やギリシャ文字等は専用コマンドを用いることで入力することができます。これらは「\\$\\$」または「\\$」で文字列を挟むことでコマンドとして認識されます。
文章中に数式を埋め込みたい場合は「\\$」、独立した数式のブロックを生成したい場合は「\\$\\$」で該当部分を挟みます。

katexの記法について詳しく知りたい方は、下記リンクを参照ください。
[katexコマンド一覧](https://katex.org/docs/supported.html)

また、「コンテンツ作成」ページの問題文の入力欄では、一部katexコマンドのボタン入力に対応しています。

## 例

以下にいくつか例を示します。

### 文字装飾
\`\`\`
*Question Station*
**Question Station**
***Question Station***
\`\`\`

*Question Station*
**Question Station**
***Question Station***

### 箇条書き
\`\`\`
- 点１
- 点２
1. ナンバリング１
1. ナンバリング２
\`\`\`

- 点１
- 点２
1. ナンバリング１
1. ナンバリング２

### リンク
\`\`\`
[Question Station](${window.location.origin})
\`\`\`

[Question Station](${window.location.origin})

### 画像

\`\`\`
![image](${window.location.origin}/favicon.ico)
\`\`\`

![image](${window.location.origin}/favicon.ico)

### インライン数式
\`\`\`
不定積分$\\int x^2 dx$を計算せよ。
\`\`\`

不定積分$\\int x^2 dx$を計算せよ。

### ブロック数式
\`\`\`
次の不定積分を計算せよ。
$$\\int x^2 dx$$
\`\`\`

次の不定積分を計算せよ。
$$\\int x^2 dx$$

`;
