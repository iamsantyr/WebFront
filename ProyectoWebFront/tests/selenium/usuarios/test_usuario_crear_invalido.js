const { Builder, By, until } = require("selenium-webdriver");

(async function crearUsuarioInvalido() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. LOGIN
    await driver.get("http://localhost:4200/login");
    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // 2. IR A CREAR USUARIO
    await driver.get("http://localhost:4200/crear-usuario");

    // Esperar campo nombre
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // 3. Datos inválidos
    await driver.findElement(By.id("name")).sendKeys(""); // nombre vacío
    await driver.findElement(By.id("email")).sendKeys("no-es-email");
    await driver.findElement(By.id("password")).sendKeys("1");

    // Intentar enviar
    await driver.findElement(By.css("button[type='submit']")).click();

    // 4. Verificar que aparece mensaje de error o que NO navega
    let url = await driver.getCurrentUrl();

    if (url.includes("crear-usuario")) {
      console.log("✔ PRUEBA OK: No permitió crear usuario inválido");
    } else {
      console.log("❌ ERROR: Navegó fuera aunque los datos eran inválidos");
    }
  } catch (e) {
    console.error("❌ ERROR en la prueba:", e);
  } finally {
    await driver.quit();
  }
})();
