(() => {
  const data = window.TOUR_DATA;
  const scenes = data.scenes;
  const routeToScene = Object.fromEntries(Object.entries(scenes).map(([id,s]) => [s.route,id]));
  const landing = document.querySelector("#landing");
  const tour = document.querySelector("#tour");
  const title = document.querySelector("#scene-title");
  const modal = document.querySelector("#modal");
  const modalContent = document.querySelector("#modal-content");
  const modalClose = document.querySelector("#modal-close");
  let viewer = null;

  const route = () => {
    const raw = (location.hash || "#/").slice(1);
    return raw.startsWith("/") ? raw : "/" + raw;
  };

  const go = (path) => { location.hash = "#" + path; };

  function tooltipFactory(hotSpotDiv, args) {
    const dot = document.createElement("div");
    dot.className = "hotspot-dot";
    hotSpotDiv.appendChild(dot);
    if (args?.text) {
      const span = document.createElement("span");
      span.textContent = args.text;
      hotSpotDiv.appendChild(span);
    }
  }

  function openModal(html) {
    modalContent.innerHTML = html;
    if (!modal.open) modal.showModal();
  }

  function openInfo(h) {
    openModal(`<div class="modal-body"><h3>${escapeHtml(h.title || h.text || "Thông tin")}</h3><p>${escapeHtml(h.body || "")}</p></div>`);
  }

  function openVideo(h) {
    const src = safeEmbed(h.video);
    if (!src) return;
    openModal(`<div class="modal-body"><h3>${escapeHtml(h.text || "Video")}</h3><iframe class="video-frame" src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`);
  }

  function openPhoto(h) {
    const src = safeImage(h.image);
    if (!src) return;
    openModal(`<div class="modal-body"><h3>${escapeHtml(h.text || "Hình ảnh")}</h3><img class="photo" src="${src}" alt="${escapeHtml(h.text || "Hình ảnh")}" /></div>`);
  }

  function hotSpotClick(_event, h) {
    if (h.kind === "move" && scenes[h.target]) {
      if (viewer) {
        try {
          viewer.lookAt(viewer.getPitch(), viewer.getYaw(), 50, 700);
          setTimeout(() => go(scenes[h.target].route), 320);
          return;
        } catch (_) {}
      }
      go(scenes[h.target].route);
    } else if (h.kind === "video") openVideo(h);
    else if (h.kind === "photo") openPhoto(h);
    else openInfo(h);
  }

  function renderScene(sceneId) {
    const s = scenes[sceneId];
    if (!s) return go("/home");
    landing.classList.add("is-hidden");
    tour.classList.remove("is-hidden");
    title.textContent = s.title;

    document.querySelectorAll(".dock button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.route === s.route);
    });

    if (viewer) {
      try { viewer.destroy(); } catch (_) {}
      viewer = null;
    }

    const hotSpots = (s.hotSpots || []).map(h => ({
      pitch: h.pitch,
      yaw: h.yaw,
      type: "custom",
      cssClass: "hotspot-" + (h.kind || "info"),
      createTooltipFunc: tooltipFactory,
      createTooltipArgs: h,
      clickHandlerFunc: hotSpotClick,
      clickHandlerArgs: h
    }));

    viewer = pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: s.panorama,
      pitch: s.pitch ?? 0,
      yaw: s.yaw ?? 90,
      hfov: s.hfov ?? 120,
      autoLoad: true,
      draggable: true,
      showFullscreenCtrl: false,
      showZoomCtrl: true,
      doubleClickZoom: true,
      keyboardZoom: true,
      compass: false,
      hotSpotDebug: false,
      sceneFadeDuration: 900,
      hotSpots
    });
  }

  function renderRoute() {
    const current = route();
    if (current === "/" || current === "") {
      if (viewer) { try { viewer.destroy(); } catch (_) {} viewer = null; }
      tour.classList.add("is-hidden");
      landing.classList.remove("is-hidden");
      return;
    }
    const sceneId = routeToScene[current] || (current === "/lobby" ? "lobby" : null);
    renderScene(sceneId || "home");
  }

  function openMap() {
    const buttons = Object.entries(scenes).map(([id,s]) =>
      `<button data-map-target="${s.route}"><strong>${escapeHtml(s.title)}</strong><br><small>${escapeHtml(s.route)}</small></button>`
    ).join("");
    openModal(`<div class="modal-body"><h3>Sơ đồ tham quan</h3><p>Chọn không gian muốn đến.</p><div class="modal-grid">${buttons}</div></div>`);
    modalContent.querySelectorAll("[data-map-target]").forEach(btn => {
      btn.addEventListener("click", () => { modal.close(); go(btn.dataset.mapTarget); });
    });
  }

  function escapeHtml(v="") {
    return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }

  function safeEmbed(url="") {
    try {
      const u = new URL(url);
      return ["www.youtube.com","youtube.com","www.youtube-nocookie.com"].includes(u.hostname) ? u.href : "";
    } catch (_) { return ""; }
  }

  function safeImage(url="") {
    try {
      const u = new URL(url, location.href);
      return ["http:","https:"].includes(u.protocol) ? u.href : "";
    } catch (_) { return ""; }
  }

  document.querySelector("#btn-enter").addEventListener("click", () => go("/lobby"));
  document.querySelector("#btn-home").addEventListener("click", () => go("/"));
  document.querySelector("#btn-map").addEventListener("click", openMap);
  document.querySelector("#btn-fullscreen").addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {}
  });
  document.querySelectorAll(".dock [data-route]").forEach(btn => btn.addEventListener("click", () => go(btn.dataset.route)));
  modalClose.addEventListener("click", () => modal.close());
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
  window.addEventListener("hashchange", renderRoute);

  // Endpoint found in the supplied original bundle:
  // https://hcmussh.edu.vn/api/count/undong
  // It is intentionally NOT called here, to avoid modifying the original site's analytics.
  renderRoute();
})();