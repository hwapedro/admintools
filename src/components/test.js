import showdown from "showdown"

var converter = new showdown.Converter(),
  text = ` asdasds [dad](http://)  asd **gfhfghgfhf**
  *  12
  *  12
  *  5`,
  html = converter.makeHtml(text);
  console.log(html)
