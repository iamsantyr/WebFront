const { Builder, By, until } = require('selenium-webdriver');

(async function mostrarEmpresas() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // =======================
    // LOGIN
    // =======================
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();

    // Esperar home
    await driver.wait(until.urlContains("/home"), 5000);

    // =======================
    // NAVEGAR A MOSTRAR EMPRESAS
    // =======================
    await driver.get("http://localhost:4200/mostrar-empresas");

    // Esperar que cargue tabla/lista
    await driver.wait(until.elementLocated(By.css(".empresa-card, table, .empresa-row")), 5000);

    console.log("✔ PRUEBA EXITOSA: Lista de empresas cargada correctamente");

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }

})();
