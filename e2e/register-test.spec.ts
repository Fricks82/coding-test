import { test, expect } from "@playwright/test";

/** 新規ユーザー登録テスト */
test("test", async ({ page }) => {
  const date = Date.now().toString();
  // localhost:3000に遷移
  await page.goto("http://localhost:3000/");
  // register/に遷移
  await page.getByRole("link", { name: "こちら" }).click();
  // フォームの項目入力
  await page.locator("#userName").fill("PlayrightTest" + date);
  await page
    .locator("#email")
    .fill("playright.test" + date + "@playright.test");
  await page.locator("#password").fill("DummyPassword123");
  await page.locator("#avatar").click();
  await page.locator("#avatar").setInputFiles("e2e/image.jpg");
  await page.locator("#birthDay").fill("2000-01-01");
  await page.getByLabel("男性").check();
  await page.locator("#agree").check();
  // 新規登録ボタン押下
  await page.getByRole("button", { name: "新規登録" }).click();
  await expect(page.locator("#loading")).toBeHidden({ timeout: 10000 });
  // 投稿一覧表示確認
  await expect(page.locator("#post-list")).toBeVisible({ timeout: 10000 });
  await page.screenshot({
    path: "e2e/screeshot/register/test-" + date + ".png",
  });
});
