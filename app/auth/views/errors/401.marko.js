function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      header_template = loadTemplate(require.resolve("../../../base/views/header.marko")),
      footer_template = loadTemplate(require.resolve("../../../base/views/footer.marko"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><meta charset=\"UTF-8\"><title>Document</title><link rel=\"stylesheet\" href=\"/styles.css\"> </head><body class=\"container\">");

    header_template.render({
        title: "Not authorized!"
      }, out);

    out.w("<p>You are not allowed to access this page.</p><a href=\"/\">Back</a>");

    footer_template.render({}, out);

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
