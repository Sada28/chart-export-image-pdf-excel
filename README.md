# chart-export-image-pdf-excel
📊 A React Native app to download line chart data as Image (PNG), PDF table, and Excel (CSV) formats — built using react-native-chart-kit, view-shot, and RNFS. Includes Android 10+ and 13+ storage permission support.


# 📈 React Native Chart Downloader App

This is a simple React Native app that displays a **Line Chart** and allows users to **download it as:**
- 📷 Image (PNG)
- 📄 PDF Report
- 📊 CSV (Excel-compatible)

---

## 📱 Android Compatibility

| Android Version | Status        |
|-----------------|---------------|
| Android 9 (API 28) and below | ✅ Full support |
| Android 10 (API 29)          | ✅ Full support |
| Android 11+ (API 30+)        | ⚠️ Partially supported (uses legacy storage) |
| Android 13+ (API 33+)        | ✅ Requires runtime permission for `READ_MEDIA_IMAGES` |

> ✅ Tested on devices running Android 10, 11, and 13

---

## 🚀 Features

- Beautiful **Bezier Line Chart** using `react-native-chart-kit`
- Export chart data as:
  - 📷 PNG Image (using `react-native-view-shot`)
  - 📄 PDF Table (using `react-native-html-to-pdf`)
  - 📊 CSV (using `react-native-fs`)
- Media scanner support to show saved files in **Downloads or Gallery**
- Compatible with **Scoped Storage** (partially) and **Downloads folder**

---

## 📦 Used Libraries

| Package | Purpose |
|--------|----------|
| [`react-native-chart-kit`](https://github.com/indiespirit/react-native-chart-kit) | To render line charts |
| [`react-native-view-shot`](https://github.com/gre/react-native-view-shot) | Capture chart as image |
| [`react-native-fs`](https://github.com/itinance/react-native-fs) | File system access (save image/pdf/csv) |
| [`react-native-html-to-pdf`](https://github.com/christopherdro/react-native-html-to-pdf) | Generate PDF |
| [`rn-fetch-blob`](https://github.com/joltup/rn-fetch-blob) | Media scanner (show files in gallery/downloads) |
| [`@react-native-picker/picker`](https://github.com/react-native-picker/picker) | Dropdown for selecting format |

---

## 📲 APK Installation

You can install the app directly by downloading the APK:

👉 [**Download APK**]

1. Download the APK from the link above  
2. Allow "Install from unknown sources" in Android settings  
3. Install and open the app  

> Note: App may ask for file storage/media permissions – please allow to enable saving.

---

## 🖼️ Screenshots

![DownloadOption](https://github.com/user-attachments/assets/f8a0a458-7730-4167-a264-26cacec29ff2)
![GrapthHome](https://github.com/user-attachments/assets/5426a069-44c9-47b5-87ce-90bc9b18391b)



---

## 🛠️ How to Run the App

```bash
git clone https://github.com/Sada28/chart-export-image-pdf-excel.git
cd your-project
npm install
npx react-native run-android
