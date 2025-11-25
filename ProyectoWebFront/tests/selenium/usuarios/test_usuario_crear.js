const { Builder, By, until } = require("selenium-webdriver");

(async function crearUsuario() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. LOGIN
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 6000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 6000);

    // 2. IR A CREAR USUARIO
    await driver.get("http://localhost:4200/crear-usuario");

    await driver.wait(until.elementLocated(By.id("name")), 6000);

    // 3. LLENAR FORMULARIO REAL SEGÚN TU HTML
    await driver.findElement(By.id("name")).sendKeys("Usuario Selenium");
    await driver.findElement(By.id("email")).sendKeys("nuevo_usuario@test.com");
    await driver.findElement(By.id("password")).sendKeys("clave1234");
    await driver.findElement(By.id("organizationId")).sendKeys("1");

    // BOTÓN DE CREAR
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PRUEBA OK: Usuario creado exitosamente");

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
