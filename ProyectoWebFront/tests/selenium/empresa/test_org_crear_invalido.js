const { Builder, By, until } = require("selenium-webdriver");

(async function crearEmpresaInvalida() {
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

    // 2. Ir al formulario real correcto
    await driver.get("http://localhost:4200/registro-de-empresa");

    // Esperar input 'name'
    await driver.wait(until.elementLocated(By.id("name")), 5000);

    // -----------------------
    //  DATOS INVALIDOS
    // -----------------------
    await driver.findElement(By.id("name")).sendKeys("");        // vacio
    await driver.findElement(By.id("nit")).sendKeys("ABC123");  // invalido
    await driver.findElement(By.id("email")).sendKeys("no-es-mail"); // mal formato

    // Botón de registro
    await driver.findElement(By.css("button[type='submit']")).click();

    // Espera pequeño para que la validación aparezca
    await driver.sleep(1500);

    // Buscar mensajes de error
    let errores = await driver.findElements(By.css(".ng-invalid"));

    if (errores.length > 0) {
      console.log("✔ PRUEBA OK: Validaciones de empresa inválida detectadas");
    } else {
      console.log("❌ PRUEBA FALLÓ: No se detectaron errores del formulario");
    }

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
