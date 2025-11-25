const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loginIncorrecto() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get("http://localhost:4200/login");

    // Esperar campos
    await driver.wait(until.elementLocated(By.id("email")), 5000);

    // Mandar credenciales incorrectas
    await driver.findElement(By.id("email")).sendKeys("usuario@incorrecto.com");
    await driver.findElement(By.id("password")).sendKeys("clave-mala");

    await driver.findElement(By.css("button[type='submit']")).click();

    // Esperar el alert
    await driver.wait(until.alertIsPresent(), 5000);

    // Cambiar el alert a resultado esperado
    let alert = await driver.switchTo().alert();
    let texto = await alert.getText();

    if (texto.includes("Las credenciales no coinciden")) {
      console.log("✔ PRUEBA EXITOSA: Alert de credenciales incorrectas detectado");
    } else {
      console.log("❌ PRUEBA FALLÓ: El alert no es el esperado");
    }

    await alert.accept(); // cerrar alert
  } catch (e) {
    console.error("❌ ERROR en la prueba:", e);
  } finally {
    await driver.quit();
  }
})();
