import { test, expect } from "@playwright/test";

/** 既存ユーザーの一覧表示、投稿、削除テスト */
test("test", async ({ page }) => {
  const date = Date.now().toString();
  // localhost:3000に遷移
  await page.goto("http://localhost:3000/");
  // email,paswordでログイン
  await page.locator("#email").fill("playright.test@playright.test");
  await page.locator("#password").fill("DummyPassword123");
  await page.getByRole("button", { name: "ログイン" }).click();
  // 投稿一覧表示
  await expect(page.locator("#post-list")).toBeVisible({ timeout: 10000 });
  // テスト投稿
  await page.locator("#post-text").fill("テスト投稿" + date);
  await page.locator("#post-button").click();
  // テスト投稿表示確認
  await expect(
    page.locator("#post-list").filter({ hasText: "テスト投稿" + date })
  ).toBeVisible();
  await page.screenshot({
    path: "e2e/screeshot/post-delete/test-" + date + ".png",
  });
  // テスト投稿削除
  await page.locator("button", { hasText: "削除" }).nth(0).click();
  // テスト投稿削除確認
  await expect(
    page.locator("#post-list").filter({ hasText: "テスト投稿" + date })
  ).toBeHidden();
});
