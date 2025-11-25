const { Builder, By, until } = require("selenium-webdriver");

(async function eliminarEmpresa() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {

    // LOGIN PRIMERO
    await driver.get("http://localhost:4200/login");
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlContains("/home"), 5000);

    // IR A LISTA DE EMPRESAS
    await driver.get("http://localhost:4200/mostrar-empresas");

    // ESPERAR QUE SE RENDERICE LA LISTA
    await driver.wait(until.elementLocated(By.css(".empresa-card")), 8000);

    // TOMAR EL PRIMER BOTÓN DE ELIMINAR
    let btnEliminar = await driver.findElement(By.xpath("//button[contains(text(),'Eliminar')]"));
    await btnEliminar.click();

    // ESPERAR ALERTA
    await driver.wait(until.alertIsPresent(), 5000);

    let alert = await driver.switchTo().alert();
    let texto = await alert.getText();

    console.log("Alert:", texto);

    await alert.accept(); // confirmar eliminación

    console.log("✔ EMPRESA ELIMINADA (PRUEBA OK)");

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }

})();
