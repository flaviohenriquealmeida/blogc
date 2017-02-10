function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<ul class=\"list-unstyled\">");

    forEach(data.messages, function(message) {
      out.w("<li class=\"alert " +
        escapeXmlAttr(data.errorMessage ? "alert-danger" : "alert-info") +
        "\">" +
        escapeXml(message) +
        "</li>");
    });

    out.w("</ul>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
