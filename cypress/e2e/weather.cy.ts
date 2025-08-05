describe("Weather Page", () => {
  it("should load the weather page", () => {
    cy.visit("/weather");
    cy.contains("Wetter"); // change text as needed
  });
  it("should display the current temperature", () => {
    cy.visit("/weather");

    cy.get("#root > div > div > button").click();
    cy.wait("@getCurrentWeather");

    cy.get(
      "#root > div > p.MuiTypography-root.MuiTypography-body1.MuiTypography-alignCenter.css-i7u8ff-MuiTypography-root"
    )
      .should("exist")
      .should("contain.text", "20.2 °C"); // change selector as needed
  });
});
