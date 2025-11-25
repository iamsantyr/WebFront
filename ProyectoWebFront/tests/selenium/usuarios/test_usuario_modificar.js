const { Builder, By, until } = require("selenium-webdriver");

(async function modificarUsuario() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // === LOGIN ===
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // === NAVEGAR A MODIFICAR USUARIO ===
    await driver.get("http://localhost:4200/modificar-usuario");

    // Esperar inputs
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // Llenar datos válidos
    await driver.findElement(By.id("name")).clear();
    await driver.findElement(By.id("name")).sendKeys("Usuario Modificado");

    await driver.findElement(By.id("email")).clear();
    await driver.findElement(By.id("email")).sendKeys("modificado@test.com");

    await driver.findElement(By.id("password")).clear();
    await driver.findElement(By.id("password")).sendKeys("123456789");

    await driver.findElement(By.id("organizationId")).clear();
    await driver.findElement(By.id("organizationId")).sendKeys("1");

    // Enviar formulario
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ Usuario modificado correctamente (prueba OK)");
  } catch (e) {
    console.error("❌ ERROR en la prueba:", e);
  } finally {
    await driver.quit();
  }
})();
