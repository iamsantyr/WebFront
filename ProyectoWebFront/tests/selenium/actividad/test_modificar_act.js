const { Builder, By, until, Key } = require("selenium-webdriver");

(async function modificarActividad() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Login
    await driver.get("http://localhost:4200/login");
    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Entrar a modificar actividad
    await driver.get("http://localhost:4200/modificar-actividad");

    // Esperar inputs reales del HTML
    await driver.wait(until.elementLocated(By.id("id")), 6000);

    // Llenar ID
    const idInput = await driver.findElement(By.id("id"));
    await idInput.clear();
    await idInput.sendKeys("1");

    // Nombre
    const nameInput = await driver.findElement(By.id("name"));
    await nameInput.clear();
    await nameInput.sendKeys("Actividad Selenium Modificada");

    // Tipo → seleccionar PRIMERA opción válida del select
    const select = await driver.findElement(By.id("type"));
    await select.click();

    // Esperar las opciones dentro del select (excepto la disabled)
    const options = await driver.findElements(By.css("#type option:not([disabled])"));

    if (options.length === 0) {
      throw new Error("No hay opciones válidas en el select");
    }

    await options[1].click(); // la primera opción REAL (no la vacía)

    // Descripción
    const desc = await driver.findElement(By.id("description"));
    await desc.clear();
    await desc.sendKeys("Descripción modificada por Selenium");

    // X
    const x = await driver.findElement(By.id("x"));
    await x.clear();
    await x.sendKeys("60");

    // Y
    const y = await driver.findElement(By.id("y"));
    await y.clear();
    await y.sendKeys("200");

    // Guardar
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ ACTIVIDAD MODIFICADA CORRECTAMENTE");

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
