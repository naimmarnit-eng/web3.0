import sanitizeHtml from "sanitize-html";

export function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "a", "b", "i", "strong", "em", "strike", "code", "pre",
      "ul", "ol", "li", "blockquote", "hr", "br",
      "table", "thead", "tbody", "tr", "th", "td", "span"
    ],
    allowedAttributes: {
      "a": ["href", "name", "target", "rel"],
      "td": ["colspan", "rowspan"],
      "th": ["colspan", "rowspan"],
      "span": ["style"],
      "p": ["style"],
      "h1": ["style"],
      "h2": ["style"],
      "h3": ["style"],
      "h4": ["style"],
      "h5": ["style"],
      "h6": ["style"],
      "li": ["style"],
      "blockquote": ["style"]
    },
    allowedStyles: {
      "*": {
        "font-size": [/^\d+(px|em|rem|%)$/],
        "text-align": [/^left|right|center|justify$/]
      }
    },
    selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false
  });
}
