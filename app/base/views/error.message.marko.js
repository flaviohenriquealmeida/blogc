function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w("<ul class=\"list\">");

    forEach(data.errors, function(err) {
      out.w("<li class=\"alert alert-danger\">" +
        escapeXml(err) +
        "</li>");
    });

    out.w("</ul>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
