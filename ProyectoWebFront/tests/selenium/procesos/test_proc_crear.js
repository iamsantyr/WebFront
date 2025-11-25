const { Builder, By, until } = require("selenium-webdriver");

(async function crearProceso() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // LOGIN
    await driver.get("http://localhost:4200/login");
    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 6000);

    // IR A FORMULARIO
    await driver.get("http://localhost:4200/crear-proceso");

    // CAMPOS
    await driver.wait(until.elementLocated(By.id("name")), 5000);
    await driver.findElement(By.id("name")).sendKeys("Proceso Selenium");

    await driver.findElement(By.id("description")).sendKeys("Descripción Selenium");

    // DETECTA EL PRIMER ESTADO DISPONIBLE
    const select = await driver.findElement(By.id("status"));
    await select.click();

    const opciones = await driver.findElements(By.css("#status option"));
    await opciones[1].click(); // la opción 0 es "Selecciona un estado"

    // ORGANIZACIÓN
    await driver.findElement(By.id("organizationId")).sendKeys("1");

    // GUARDAR
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PROCESO CREADO");
  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
