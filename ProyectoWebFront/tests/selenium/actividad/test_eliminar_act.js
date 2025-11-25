const { Builder, By, until } = require("selenium-webdriver");

(async function eliminarActividad() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Login
    await driver.get("http://localhost:4200/login");
    await driver.findElement(By.id("email")).sendKeys("selenium@test.com");
    await driver.findElement(By.id("password")).sendKeys("12345678");
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/home"), 5000);

    // 2. Ir a eliminar actividad
    await driver.get("http://localhost:4200/eliminar-actividad");

    // 3. Capturar la primera actividad
    await driver.wait(until.elementLocated(By.css(".item")), 5000);

    let idText = await driver.findElement(By.css(".item .pid")).getText(); // "#4"
    let id = idText.replace("#", "").trim();

    // 4. Dar clic en Eliminar del primer item
    await driver.findElement(By.css(".item .eliminar-btn")).click();

    // 5. Manejar el alert
    let alert = await driver.switchTo().alert();
    let msg = await alert.getText();
    console.log("✔ Alert de eliminación:", msg);
    await alert.accept();

    // 6. Recargar para verificar
    await driver.get("http://localhost:4200/eliminar-actividad");

    // 7. Comprobar si sigue existiendo esa actividad
    let existe = await driver.findElements(
      By.xpath(`//div[@class="pid" and text()="#${id}"]`)
    );

    if (existe.length === 0) {
      console.log("✔ Actividad eliminada correctamente");
    } else {
      console.log("❌ La actividad SIGUE apareciendo");
    }

  } catch (e) {
    console.error("❌ ERROR:", e);
  } finally {
    await driver.quit();
  }
})();
