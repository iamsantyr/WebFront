const { Builder, By, until } = require("selenium-webdriver");

(async function crearRol() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. LOGIN
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Ir a crear rol
    await driver.get("http://localhost:4200/crear-rol-de-proceso");

    // Esperar inputs
    await driver.wait(until.elementLocated(By.id("nombreRol")), 5000);

    // 3. Llenar datos
    await driver.findElement(By.id("nombreRol")).sendKeys("Rol Selenium");
    await driver.findElement(By.id("descripcion")).sendKeys("Descripción de rol creada por Selenium");

    // 4. Enviar formulario
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PRUEBA OK: Rol creado correctamente");
  } catch (err) {
    console.error("❌ ERROR:", err);
  } finally {
    await driver.quit();
  }
})();
