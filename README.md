# 3D U Đông

Bản dựng lại kiến trúc phòng trưng bày thực tế ảo dựa trên bundle React / Pannellum đã phân tích.

## Live

GitHub Pages dự kiến: https://xulytiengviet.github.io/3Dudong/

## Kiến trúc

- Static SPA, không cần Node/build để chạy.
- Pannellum 2.5.7 cho panorama equirectangular 360°.
- Hash router tương thích GitHub Pages:
  - `#/`
  - `#/home`
  - `#/lobby`
  - `#/room_1`
  - `#/room_2`
  - `#/room_3`
  - `#/room_4`
- Hotspot: `move`, `info`, `video`, `photo`.
- Sơ đồ phòng, toàn màn hình, modal nội dung.

## Dữ liệu scene

Toàn bộ cấu hình nằm trong `scenes.js`.

Mỗi scene:

```js
{
  route: "/room_1",
  title: "Phòng 1",
  panorama: "URL_ANH_360.jpg",
  pitch: 0,
  yaw: 90,
  hfov: 120,
  hotSpots: [
    { pitch: -7, yaw: 30, kind: "move", text: "Sang phòng 2", target: "room_2" }
  ]
}
```

Thay URL ảnh mẫu của Pannellum bằng ảnh equirectangular 2:1 thực tế để hoàn thiện nội dung.

## Endpoint gốc đã phát hiện

Bundle được cung cấp có gọi:

`GET https://hcmussh.edu.vn/api/count/undong`

Bản dựng lại **không gọi endpoint này** để tránh làm sai số analytics của website gốc. Endpoint chỉ được giữ trong metadata / chú thích mã nguồn.

## Triển khai

Workflow `.github/workflows/pages.yml` deploy trực tiếp repository root lên GitHub Pages sau mỗi push vào `main`.

## Ghi chú

Các panorama hiện tại là ảnh demo công khai từ tài liệu Pannellum nhằm bảo đảm trang chạy được ngay. Ảnh / video / nội dung gốc của hệ thống ban đầu chưa có trong các bundle đã cung cấp nên không được suy đoán hoặc sao chép.