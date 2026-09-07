import { test, expect } from '@playwright/test';

// Grabado con playwright codegen y completado a mano con los expect.

test('login con credenciales validas ingresa al sistema', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('admin@correo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('123');
  await page.getByRole('button', { name: 'Ingresar' }).click();

  // Verificacion real (esto es lo que el .click() grabado no comprobaba)
  await expect(page.getByRole('heading', { name: 'Bienvenido al Sistema' })).toBeVisible();

  // Cerrar sesion y confirmar que vuelve al formulario de login
  await page.getByRole('button', { name: 'Salir' }).click();
  await expect(page.locator('input[name="email"]')).toBeVisible();
});

test('login con credenciales invalidas muestra el mensaje de error', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('ivan.luna@email.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'Ingresar' }).click();

  const alerta = page.locator('.alert-danger');
  await expect(alerta).toBeVisible();
  await expect(alerta).toHaveText('Credenciales de Mock inválidas');
});
