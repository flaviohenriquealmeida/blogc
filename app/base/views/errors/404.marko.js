function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      loadTemplate = __helpers.l,
      header_template = loadTemplate(require.resolve("../header.marko")),
      footer_template = loadTemplate(require.resolve("../footer.marko"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"pt-br\"><head><meta charset=\"UTF-8\"><title>Document</title><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css\" integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\"></head><body class=\"container\">");

    header_template.render({
        title: "Page not found"
      }, out);

    out.w("<p>Page not found</p><a href=\"/posts\">Back</a>");

    footer_template.render({}, out);

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
