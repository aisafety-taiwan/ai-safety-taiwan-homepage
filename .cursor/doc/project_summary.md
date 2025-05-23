# 專案理解與網頁迭代修正說明

## 1. 專案理解

本專案是「AI Safety Taiwan」組織的官方靜態網站。主要目標是向大眾介紹該組織、其使命、團隊成員、最新消息、相關資源（文章、工具、教程）、活動資訊以及聯絡方式。

技術方面，此網站主要採用以下技術：

*   **前端基礎**：HTML5, CSS3, JavaScript
*   **CSS 框架與工具**：Bootstrap 4.5.2 (用於響應式佈局與組件), 自訂 CSS (包含 `variables.css`, `style.css`, `animations.css`, `responsive.css`, `theme-switch.css` 等，實現了毛玻璃效果、深色/淺色主題切換等視覺風格)
*   **JavaScript 應用**：實現動態效果 (`effects.js`)、前端路由 (`routing.js`) 及主要功能邏輯 (`main.js`)
*   **外部資源**：Font Awesome (圖標), Google Fonts (字體)
*   **版本控制與部署**：Git, GitHub Pages (用於線上部署)
*   **可能的輔助工具**：`server.js` (一個簡易的 Express 伺服器，用於本地開發預覽), `_config.yml` (可能暗示曾考慮或使用 Jekyll 等靜態網站生成器)

網站結構包含多個 HTML 頁面 (如 `index.html`, `about.html`, `news.html`, `resources.html` 等)，並強調雙語內容（中文/英文）與響應式設計。

## 2. 網頁迭代修正的知識說明 (Domain Knowledge)

在本次協作調整「資源頁面」樣式的過程中，我們經歷了多次的修改與確認。這種迭代的過程在網頁前端開發，尤其是 CSS 樣式調整中，是非常常見且正常的。以下解釋為何通常難以一次性完美修正：

*   **CSS 的層疊性 (Cascading)**：
    CSS 的核心特性之一。瀏覽器會從多個來源（瀏覽器預設樣式、外部樣式表、內部樣式、行內樣式）收集 CSS 規則，並根據一定的優先級順序層疊套用。新的樣式可能會覆蓋舊的，或者多個樣式共同作用。有時候一個小小的改動，可能會因為層疊的關係，在我們未預期的地方產生影響。

*   **CSS 的特異性 (Specificity)**：
    當多條規則應用到同一個元素上時，瀏覽器會使用「特異性」來決定哪條規則的權重更高，從而最終生效。特異性由選擇器的類型（ID 選擇器、class 選擇器、標籤選擇器等）和數量決定。例如，`#id .class tag` 的特異性就比 `.another-class` 高。在複雜的專案中，很容易因為特異性計算不夠精確，導致樣式未如預期套用，需要逐步調整選擇器來達到期望的優先級。

*   **CSS 的繼承 (Inheritance)**：
    某些 CSS 屬性（如 `color`, `font-family`, `text-align`）可以從父元素繼承給子元素。雖然這很方便，但也可能導致意外。例如，我們之前遇到的文字置中問題，就是因為父層設定了 `text-align: center;`，導致卡片內的文字也繼承了這個屬性而置中。解決方法是更精確地將該屬性應用於目標元素，或在子元素上明確覆寫。

*   **視覺回饋的必要性**：
    網頁設計是高度視覺化的。即使在紙上或腦中規劃了完美的樣式，實際在瀏覽器中渲染出來的效果，往往會因為像素級的差異、不同瀏覽器的渲染差異、或是與其他元素的互動關係而有所不同。因此，開發者通常需要：
    1.  做出初步修改。
    2.  在瀏覽器中觀察實際效果。
    3.  根據視覺回饋，找出問題點或不如預期之處。
    4.  回到程式碼進行調整。
    5.  重複此過程，直到滿意為止。
    我們這次的協作就是一個典型的例子：看到截圖 -> 發現問題（如背景太暗、文字被覆蓋、不必要的置中）-> 分析 CSS -> 修改 -> 再次確認。

*   **既有程式碼的複雜性**：
    在一個已經存在的專案中進行修改，需要先理解現有的 CSS 架構、變數定義、以及各種 class 的用途。直接添加新的樣式，如果沒有充分考慮到與現有樣式的相互作用，很容易產生衝突或達不到預期效果。例如，我們需要確認使用的顏色變數 (`--glass-bg-light`, `--text-primary` 等) 在不同主題模式下是否有正確定義和套用。

*   **上下文依賴**：
    一個元素的最終樣式，往往取決於它在 HTML 結構中的位置及其周圍元素的樣式。我們調整「我們的文章」區塊的背景時，最終發現問題是其父層 `div` 的 class 與上方區塊不同，導致未能繼承正確的背景圖片和效果。這就需要檢查 HTML 結構和相關的 CSS 規則。

總之，CSS 的靈活和強大也帶來了其複雜性。透過逐步調整、利用瀏覽器開發者工具檢查元素樣式、以及清晰的溝通與視覺回饋，是高效解決 CSS 問題並達到理想設計目標的關鍵。

## 3. 摘要

本文件概述了對「AI Safety Taiwan」網站專案的理解，包括其目標、技術架構和內容。同時，詳細解釋了網頁前端開發中，特別是 CSS 樣式調整為何常需要迭代修正。其主要原因包含 CSS 的層疊性、特異性、繼承機制，視覺回饋在調整過程中的必要性，以及在既有複雜程式碼中修改樣式時，需要考慮上下文和現有規則的相互作用。透過這樣逐步完善的過程，才能確保最終的網頁呈現符合預期且風格統一。 