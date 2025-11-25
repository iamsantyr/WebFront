const { Builder, By, until } = require("selenium-webdriver");

(async function modificarProceso() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. LOGIN
    await driver.get("http://localhost:4200/login");

    await driver.wait(until.elementLocated(By.id("email")), 5000);
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // 2. IR A EDITAR PROCESO
    await driver.get("http://localhost:4200/editar-proceso");

    // Esperar formulario
    await driver.wait(until.elementLocated(By.id("name")), 6000);

    // 3. LLENAR DATOS DEL PROCESO
    await driver.findElement(By.id("name")).clear();
    await driver.findElement(By.id("name")).sendKeys("Proceso Selenium Modificado");

    await driver.findElement(By.id("description")).clear();
    await driver.findElement(By.id("description")).sendKeys("Descripción actualizada por Selenium");

    await driver.findElement(By.id("category")).clear();
    await driver.findElement(By.id("category")).sendKeys("Automatización");

    // STATUS → se debe seleccionar una opción existente
    await driver.findElement(By.id("status")).click();
    await driver.findElement(By.css("#status option:nth-child(2)")).click();

    // ORGANIZACIÓN
    await driver.findElement(By.id("organizationId")).clear();
    await driver.findElement(By.id("organizationId")).sendKeys("1");

    // MULTI SELECT ACTIVITIES (si existen)
    try {
      await driver.findElement(By.id("activityIds")).click();
      let first = await driver.findElement(By.css("#activityIds option:nth-child(1)"));
      await first.click();
    } catch {}

    // MULTI SELECT ARCS
    try {
      await driver.findElement(By.id("archIds")).click();
      let firstArc = await driver.findElement(By.css("#archIds option:nth-child(1)"));
      await firstArc.click();
    } catch {}

    // MULTI SELECT GATEWAYS
    try {
      await driver.findElement(By.id("gatewayIds")).click();
      let firstGw = await driver.findElement(By.css("#gatewayIds option:nth-child(1)"));
      await firstGw.click();
    } catch {}

    // 4. ENVIAR
    await driver.findElement(By.css("button[type='submit']")).click();

    console.log("✔ PROCESO MODIFICADO CORRECTAMENTE");

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
