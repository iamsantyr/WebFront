const { Builder, By, until } = require("selenium-webdriver");

(async function crearActividad() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // LOGIN
    await driver.get("http://localhost:4200/login");
    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // CREAR ACTIVIDAD
    await driver.get("http://localhost:4200/crear-actividad");

    await driver.wait(until.elementLocated(By.id("name")), 5000);

    await driver.findElement(By.id("name")).sendKeys("Actividad Selenium");
    await driver.findElement(By.id("type")).sendKeys("Automática");
    await driver.findElement(By.id("description")).sendKeys("Actividad creada por Selenium");
    await driver.findElement(By.id("x")).sendKeys("5");
    await driver.findElement(By.id("y")).sendKeys("10");

    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PRUEBA OK: Actividad creada");
  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
