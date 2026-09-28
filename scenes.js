window.TOUR_DATA = {
  meta: {
    title: "3D U Đông",
    sourceArchitecture: "Rebuilt from the supplied React / Pannellum bundle analysis",
    originalCounterEndpoint: "https://hcmussh.edu.vn/api/count/undong",
    originalCounterEnabled: false
  },
  scenes: {
    home: {
      route: "/home",
      title: "Không gian tổng quan",
      panorama: "https://pannellum.org/images/alma.jpg",
      pitch: 0, yaw: 90, hfov: 120,
      hotSpots: [
        { pitch:-7, yaw:48, kind:"move", text:"Đi vào sảnh chính", target:"lobby" },
        { pitch:5, yaw:-35, kind:"info", text:"Giới thiệu", title:"3D U Đông", body:"Bản dựng lại kiến trúc tham quan 360° dựa trên mã nguồn đã phân tích. Dữ liệu ảnh hiện là panorama mẫu và có thể thay bằng ảnh 360° thực tế." }
      ]
    },
    lobby: {
      route: "/lobby",
      title: "Sảnh chính",
      panorama: "https://pannellum.org/images/lascar.jpg",
      pitch: 2.3, yaw: -135.4, hfov: 120,
      hotSpots: [
        { pitch:-8, yaw:-85, kind:"move", text:"Phòng 1", target:"room_1" },
        { pitch:-6, yaw:-15, kind:"move", text:"Phòng 2", target:"room_2" },
        { pitch:-6, yaw:55, kind:"move", text:"Phòng 3", target:"room_3" },
        { pitch:-8, yaw:125, kind:"move", text:"Phòng 4", target:"room_4" },
        { pitch:12, yaw:175, kind:"video", text:"Video giới thiệu", video:"https://www.youtube.com/embed/5qap5aO4i9A" }
      ]
    },
    room_1: {
      route:"/room_1",
      title:"Phòng 1 · Không gian mở đầu",
      panorama:"https://pannellum.org/images/tocopilla.jpg",
      pitch:0, yaw:80, hfov:115,
      hotSpots:[
        { pitch:-7, yaw:-55, kind:"move", text:"Về sảnh", target:"lobby" },
        { pitch:5, yaw:25, kind:"info", text:"Thông tin trưng bày", title:"Phòng 1", body:"Hotspot thông tin được tái dựng từ cơ chế custom/info của ứng dụng gốc." },
        { pitch:-2, yaw:118, kind:"photo", text:"Xem ảnh", image:"https://pannellum.org/images/tocopilla-preview.jpg" }
      ]
    },
    room_2: {
      route:"/room_2",
      title:"Phòng 2 · Câu chuyện cộng đồng",
      panorama:"https://pannellum.org/images/alma.jpg",
      pitch:0, yaw:-35, hfov:110,
      hotSpots:[
        { pitch:-8, yaw:-95, kind:"move", text:"Về sảnh", target:"lobby" },
        { pitch:4, yaw:35, kind:"info", text:"Nội dung số", title:"Phòng 2", body:"Có thể gắn văn bản, ảnh, video, liên kết khảo sát hoặc dữ liệu API vào từng hotspot." },
        { pitch:-4, yaw:120, kind:"move", text:"Sang phòng 3", target:"room_3" }
      ]
    },
    room_3: {
      route:"/room_3",
      title:"Phòng 3 · Tương tác đa phương tiện",
      panorama:"https://pannellum.org/images/lascar.jpg",
      pitch:1, yaw:25, hfov:118,
      hotSpots:[
        { pitch:-8, yaw:-120, kind:"move", text:"Về sảnh", target:"lobby" },
        { pitch:5, yaw:-15, kind:"video", text:"Mở video", video:"https://www.youtube.com/embed/5qap5aO4i9A" },
        { pitch:-5, yaw:96, kind:"move", text:"Sang phòng 4", target:"room_4" }
      ]
    },
    room_4: {
      route:"/room_4",
      title:"Phòng 4 · Kết thúc hành trình",
      panorama:"https://pannellum.org/images/tocopilla.jpg",
      pitch:0, yaw:-110, hfov:112,
      hotSpots:[
        { pitch:-7, yaw:-50, kind:"move", text:"Về sảnh", target:"lobby" },
        { pitch:7, yaw:30, kind:"info", text:"Hoàn tất tham quan", title:"Phòng 4", body:"Mô hình có thể mở rộng thành bảo tàng số, du lịch ảo, WebGIS 3D hoặc tích hợp dữ liệu địa lý." },
        { pitch:-4, yaw:115, kind:"move", text:"Về trang tổng quan", target:"home" }
      ]
    }
  }
};