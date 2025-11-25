const { Builder, By, until } = require("selenium-webdriver");

(async function mostrarProcesos() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Login
    await driver.get("http://localhost:4200/login");
    await driver.wait(until.elementLocated(By.id("email")), 5000);

    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Ir a listar procesos
    await driver.get("http://localhost:4200/mostrar-procesos");

    // La página puede tener:
    //   - div.empty (si no hay procesos)
    //   - div.procesos-grid (si hay procesos)
    // Así que esperamos cualquiera de los dos
    await driver.wait(
      until.elementLocated(
        By.css(".empty, .procesos-grid, .loading")
      ),
      8000
    );

    // revisar si aparece vacía
    let vacio = await driver.findElements(By.css(".empty"));
    let lista = await driver.findElements(By.css(".procesos-grid"));

    if (vacio.length > 0) {
      console.log("✔ Página cargó: lista vacía");
    } else if (lista.length > 0) {
      console.log("✔ Página cargó: hay procesos listados");
    } else {
      console.log("⚠ Se cargó pero no se detectó nada");
    }

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
