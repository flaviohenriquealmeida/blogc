function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><meta charset=\"UTF-8\"><title>Document</title></head><body><h1></h1><form action=\"/post/add\" method=\"POST\"><label>Slug</label><input name=\"slug\"><label>Title</label><input name=\"title\"><label>Content</label><input name=\"content\"><input type=\"submit\"></form></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
