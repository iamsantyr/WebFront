const { Builder, By, until } = require("selenium-webdriver");

(async function crearEmpresa() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Ir al login
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();

    // Esperar redirección al home
    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Ir al formulario correcto
    await driver.get("http://localhost:4200/registro-de-empresa");

    // Esperar input 'name'
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // Llenar los datos reales según tu HTML
    await driver.findElement(By.id("name")).sendKeys("Empresa Selenium");
    await driver.findElement(By.id("nit")).sendKeys("99999999");
    await driver.findElement(By.id("email")).sendKeys("empresa@test.com");

    // Botón de registro
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PRUEBA OK: Empresa creada");
  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
