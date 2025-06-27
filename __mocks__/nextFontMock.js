module.exports = new Proxy(
  {},
  {
    get: function getter() {
      return () => (
        {
          className: "--font-lora",
          variable: "--font-lora",
          style: { fontFamily: "Lora" },
        },
        {
          className: "--font-baskervville",
          variable: "--font-baskervville",
          style: { fontFamily: "Baskervville" },
        },
        {
          className: "--font-merriweather",
          variable: "merriweather",
          style: { fontFamily: "Merriweather" },
        },
        {
          className: "--font-taviraj",
          variable: "taviraj",
          style: { fontFamily: "Taviraj" },
        }
      )
    },
  }
)
