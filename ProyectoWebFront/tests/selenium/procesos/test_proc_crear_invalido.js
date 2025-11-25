const { Builder, By, until } = require("selenium-webdriver");

(async function crearProcesoInvalido() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. LOGIN
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlContains("/home"), 5000);

    // 2. IR A CREAR PROCESO
    await driver.get("http://localhost:4200/crear-proceso");

    // Esperar el input name
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // 3. INGRESAR DATOS INVÁLIDOS
    await driver.findElement(By.id("name")).sendKeys(""); // inválido
    await driver.findElement(By.id("category")).sendKeys(""); // inválido
    await driver.findElement(By.id("description")).sendKeys(""); // inválido

    // 4. SUBMIT
    await driver.findElement(By.css("button[type='submit']")).click();

    // 5. Verificar error visual
    let errores = await driver.findElements(By.css(".err, .error-message, small"));

    if (errores.length > 0) {
      console.log("✔ PRUEBA OK — Se mostraron errores de validación");
    } else {
      console.log("❌ ERROR — No aparecieron mensajes de validación");
    }

  } catch (e) {
    console.error("❌ ERROR en la prueba:", e);
  } finally {
    await driver.quit();
  }
})();
