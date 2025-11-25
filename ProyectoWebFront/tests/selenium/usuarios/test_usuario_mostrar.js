const { Builder, By, until } = require("selenium-webdriver");

(async function mostrarUsuarios() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. LOGIN
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Ir a mostrar usuarios
    await driver.get("http://localhost:4200/mostrar-usuario");

    // 3. Esperar la grilla o el mensaje de vacío
    await driver.wait(
      until.elementLocated(By.css(".usuarios-grid, .empty")),
      8000
    );

    // 4. Validar si hay usuarios
    let vacio = await driver.findElements(By.css(".empty"));

    if (vacio.length > 0) {
      console.log("⚠ Lista vacía — No hay usuarios registrados.");
    } else {
      let cards = await driver.findElements(By.css(".usuario-card"));
      console.log(`✔ Usuarios encontrados: ${cards.length}`);
    }

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
