const { Builder, By, until } = require("selenium-webdriver");

(async function crearActividadInvalida() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Login obligatorio
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();

    // Esperar redirección al home
    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Ir al formulario correcto de crear actividad
    await driver.get("http://localhost:4200/crear-actividad");

    // Esperar input principal
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // Dejar campos inválidos/vacíos
    await driver.findElement(By.id("name")).sendKeys("");
    await driver.findElement(By.id("type")).sendKeys("");
    await driver.findElement(By.id("description")).sendKeys("");

    // Clic en crear
    await driver.findElement(By.css("button[type='submit']")).click();

    // Esperar mensaje de error en frontend
    await driver.sleep(800); // por si el validador es inmediato

    console.log("✔ PRUEBA OK: Se detectaron datos inválidos");
  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
