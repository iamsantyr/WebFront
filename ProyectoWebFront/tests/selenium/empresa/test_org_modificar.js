const { Builder, By, until } = require('selenium-webdriver');

(async function editarEmpresa() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Login obligatorio
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("home"), 5000);

    // 2. Ir a editar empresa
    await driver.get("http://localhost:4200/editar-empresa");

    // Esperar que carguen los inputs reales
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // 3. Modificar datos
    await driver.findElement(By.id("name")).clear();
    await driver.findElement(By.id("name")).sendKeys("Empresa Modificada Selenium");

    await driver.findElement(By.id("email")).clear();
    await driver.findElement(By.id("email")).sendKeys("mod@selenium.com");

    await driver.findElement(By.id("nit")).clear();
    await driver.findElement(By.id("nit")).sendKeys("99999999");

    // 4. Guardar cambios
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PRUEBA OK: Empresa modificada");

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
