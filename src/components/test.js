//npm add unified unified-stream remark remark-parse remark-stringify

const unified = require('unified')
const stream = require('unified-stream')
const remark = require('remark')
var markdown = require('remark-parse')
var stringify = require('remark-stringify')

const test = `
- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
`

var processor = unified()
    .use(markdown)
    .use(stringify)
    .use(remark)
const parsed = processor.parse(test);
console.log(parsed);
console.log(processor.stringify(parsed));