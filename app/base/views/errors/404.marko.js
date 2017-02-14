function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      header_template = loadTemplate(require.resolve("../header.marko")),
      footer_template = loadTemplate(require.resolve("../footer.marko"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><meta charset=\"UTF-8\"><title>Document</title><link rel=\"stylesheet\" href=\"/styles.css\"> </head><body class=\"container\">");

    header_template.render({
        title: "Page not found"
      }, out);

    out.w("<p>Page not found</p><a href=\"/\">Back</a>");

    footer_template.render({}, out);

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
