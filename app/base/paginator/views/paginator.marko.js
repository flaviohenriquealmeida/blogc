function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<div><style scoped>\n        \n        ul {\n            text-align: center;\n        }\n\n        ul li {\n            font-size: 1.2em;\n            display: inline-block;\n            padding: 8px;\n            margin-left: 2px;\n            border: solid 1px;\n        }\n\n    </style><ul>");

    (function() {
      for (var i = 0; i <= (data.paginator.pages - 1); i++) {
        out.w("<a href=\"" +
          escapeXmlAttr(data.paginator.url) +
          "?page=" +
          escapeXmlAttr(i) +
          "&amp;limit=" +
          escapeXmlAttr(data.paginator.limit) +
          "\"><li>" +
          escapeXml(i + 1) +
          "</li></a>");
      }
    }());

    out.w("</ul></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
