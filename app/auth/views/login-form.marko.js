function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      header_template = loadTemplate(require.resolve("../../base/views/header.marko"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><meta charset=\"UTF-8\"><title>Document</title><link rel=\"stylesheet\" href=\"/styles.css\"></head><body class=\"container\">");

    header_template.render({
        title: "LOGIN"
      }, out);

    out.w("<form action=\"/admin/authenticate\" method=\"POST\"><div class=\"form-group\"><label for=\"email\">E-mail</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" autocomplete=\"off\" autofocus></div><div class=\"form-group\"><label for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" autocomplete=\"off\"></div><button type=\"submit\" class=\"btn btn-primary\">ENTER</button></form></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
