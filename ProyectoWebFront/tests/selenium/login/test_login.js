const { Builder, By, until } = require('selenium-webdriver');

(async function loginCorrecto() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get("http://localhost:4200/login");

    // Esperar campos
    await driver.wait(until.elementLocated(By.id("email")), 8000);

    // Mandar usuario válido
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();

    // En vez de esperar la URL, esperamos un elemento que solo existe después del login:
    await driver.wait(
      until.elementLocated(By.css("app-sidebar, .sidebar, nav, header, .menu")),
      8000
    );

    console.log("✔ LOGIN CORRECTO – elemento del dashboard detectado");

  } catch (e) {
    console.error("❌ ERROR en la prueba:", e);
  } finally {
    await driver.quit();
  }
})();
