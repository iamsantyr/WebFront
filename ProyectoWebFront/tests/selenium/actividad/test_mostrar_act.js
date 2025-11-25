const { Builder, By, until } = require("selenium-webdriver");

(async function mostrarActividades() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // LOGIN
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // IR A MOSTRAR ACTIVIDADES
    await driver.get("http://localhost:4200/mostrar-actividades");

    // ESPERAR LAS TARJETAS REALES
    await driver.wait(until.elementLocated(By.css(".card")), 8000);

    let cards = await driver.findElements(By.css(".card"));

    if (cards.length > 0) {
      console.log("✔ PRUEBA OK: Actividades encontradas (" + cards.length + ")");
    } else {
      console.log("❌ PRUEBA FALLÓ: No se encontraron actividades");
    }

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
