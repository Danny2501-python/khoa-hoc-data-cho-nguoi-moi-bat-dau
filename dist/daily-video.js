/* Lesson videos, with a bookmark for each study day on the learner's device. */
window.makeDailyVideo = function makeDailyVideo({st, save, esc}) {
  const playlist = "PL61DnWiz23TqNc1rtTzOTMIHKc49fUS17";
  const excelIds = "NPTOYDPrc34 OpKJDA_TPbM IGWbtGV1dno VzfLGQ60OAM iULlGZQbz7I xPg2g_s2t2U 7uxARa2-gb8 mhMWyk2DnLY sqFXGip999I M8LLrsmQBug dvCie-G9A3k cdLgdtjFTew 0faZKBnVAwA L4fiMYQov_E i5vELInEac8 s1l4PmyeXCg I5T3kH461sc".split(" ");
  const schedule = excelIds.map((video,i) => ({video, playlist, title:"Excel · Bài "+(i+1), start:0}));
  {
    const {sql: course} = PROGRAM.videos;
    const splitCount = 7;
    const items = course.items.map(([video,title,time]) => ({
      video, title, playlist:course.id, start:0,
      duration:time.split(":").reduce((a,v)=>60*a+Number(v),0)
    }));
    const split = new Set([...items].sort((a,b)=>b.duration-a.duration).slice(0,splitCount));
    for (const item of items) {
      if (split.has(item)) {
        const mid = Math.floor(item.duration/2);
        schedule.push({...item,title:item.title+" · Phần 1",end:mid},
                      {...item,title:item.title+" · Phần 2",start:mid});
      } else schedule.push(item);
    }
  }
  schedule.length = 60;
  const biPlaylist = PROGRAM.videos.bi.id;
  const biIds = new Set(PROGRAM.videos.bi.items.map(([id]) => id));
  schedule.push(...lessonVideos.days.map(item => {
    if (!item) return null;
    const [video,title] = item;
    return {video,title,playlist:biIds.has(video) ? biPlaylist : null,start:0};
  }));
  const lists = new Map(schedule.filter(Boolean).map(x=>[x.video,x.playlist]));
  const validId = value => typeof value === "string" && /^[A-Za-z0-9_-]{11}$/.test(value);
  const formatTime = value => Math.floor(value / 60) + ":" + String(value % 60).padStart(2, "0");
  let active = null;
  let apiRequested = false;

  function checkpoint(n) {
    const {video,start,end} = schedule[n-1];
    const mark = st.days[n]?.courseVideo;
    if (mark?.video === video && Number.isInteger(mark.seconds) && mark.seconds >= start && mark.seconds < (end || Infinity))
      return {day:n, video, seconds:mark.seconds};
    return {day:0, video, seconds:start};
  }

  function watchLink(mark) {
    const url = new URL("https://www.youtube.com/watch");
    url.search = new URLSearchParams({v: mark.video, t: mark.seconds + "s"});
    if (lists.get(mark.video)) url.searchParams.set("list", lists.get(mark.video));
    return url.href;
  }

  function embedLink(mark,end) {
    const url = new URL("https://www.youtube.com/embed/" + mark.video);
    url.search = new URLSearchParams({start: mark.seconds, enablejsapi: 1, playsinline: 1});
    if (end) url.searchParams.set("end",end);
    if (/^https?:$/.test(location.protocol)) url.searchParams.set("origin", location.origin);
    if (lists.get(mark.video)) url.searchParams.set("list", lists.get(mark.video));
    return url.href;
  }

  function label(mark) {
    return mark.day ? "Xem tiếp từ mốc " + formatTime(mark.seconds) + " đã lưu ở Ngày " + mark.day + "." : "Bắt đầu video được giao cho buổi này.";
  }

  function panel(n) {
    if (videoPractice[n]) return `<p>${esc(videoPractice[n])}</p>`;
    const mark = checkpoint(n);
    const prev = st.days[n-1]?.courseVideo;
    const priorLink = prev && prev.video === schedule[n-2]?.video && validId(prev.video) && Number.isInteger(prev.seconds) ? '<a class="textlink" href="'+esc(watchLink(prev))+'" target="_blank" rel="noopener">Xem tiếp buổi trước trên YouTube</a>' : "";
    return `<div data-course-video="${n}">
      <h3>${esc(schedule[n-1].title)}</h3>${schedule[n-1].end || schedule[n-1].start ? "<p>Đoạn học: "+formatTime(schedule[n-1].start)+" – "+formatTime(schedule[n-1].end || schedule[n-1].duration)+"</p>" : ""}${priorLink}<p data-mark-label>${esc(label(mark))}</p>
      <iframe class="videoplayer" title="Khóa học YouTube · Ngày ${n}" width="640" height="360" style="max-width:100%;width:100%;height:auto;aspect-ratio:16/9;border:0" src="${esc(embedLink(mark,schedule[n-1].end))}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
      <p class="small">Dành 30 phút cho phần video. Nếu bài ngắn, dùng thời gian còn lại để làm lại ví dụ trong video. Vị trí xem được lưu trên trình duyệt này khi trình phát kết nối.</p>
      <div class="actions"><a class="textlink" data-course-external href="${esc(watchLink(mark))}" target="_blank" rel="noopener">Mở tại mốc này trên YouTube</a></div>
      <details><summary>Lưu mốc xem thủ công</summary><form data-course-bookmark>
        <p class="small">Nếu xem trên YouTube, dán liên kết video đang xem và nhập phút dừng để tiếp tục bài này khi quay lại.</p>
        <label class="field"><span>Liên kết video của buổi này</span><input name="video" type="url" required value="${esc(watchLink(mark))}"></label>
        <label class="field"><span>Phút:giây (ví dụ 18:35)</span><input name="position" required value="${formatTime(mark.seconds)}" pattern="[0-9]+:[0-5][0-9]" placeholder="18:35"></label>
        <button class="btn ghost" type="submit">Lưu và mở từ mốc này</button>
        <p class="small" role="status" data-manual-status></p>
      </form></details></div>`;
  }

  function readId(text) {
    let url;
    try { url = new URL(text); } catch { return ""; }
    if (!["http:", "https:"].includes(url.protocol)) return "";
    const host = url.hostname.toLowerCase();
    if (host === "youtu.be") return url.pathname.split("/")[1];
    if (!["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)) return "";
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const path = url.pathname.split("/");
    return ["embed", "shorts", "live"].includes(path[1]) ? path[2] : "";
  }

  function record(session, video, seconds) {
    if (!validId(video) || !Number.isSafeInteger(seconds) || seconds < 0) return;
    const n = session.n;
    if (video !== schedule[n-1].video || seconds < schedule[n-1].start || seconds >= (schedule[n-1].end || Infinity)) return;
    const day = st.days[n] || (st.days[n] = {});
    if (day.courseVideo?.video === video && day.courseVideo?.seconds === seconds) return;
    day.courseVideo = {video, seconds};
    save();
    const mark = {day:n, video, seconds};
    const root = session.root;
    root.querySelector("[data-mark-label]").textContent = label(mark);
    root.querySelector("[data-course-external]").href = watchLink(mark);
    if (!root.querySelector("details").open) {
      root.querySelector("[name=video]").value = watchLink(mark);
      root.querySelector("[name=position]").value = formatTime(seconds);
    }
  }

  function capture(session) {
    if (!session || !session.hasPlayed || !session.player?.getCurrentTime) return;
    try {
      const id = readId(session.player.getVideoUrl());
      record(session, id, Math.floor(session.player.getCurrentTime()));
    } catch { /* The remote player may already have closed. */ }
  }

  function connect() {
    const session = active;
    if (!session || session.player || !window.YT?.Player || !session.frame.isConnected) return;
    const stillCurrent = event => active === session && session.player === event.target;
    try {
      session.player = new window.YT.Player(session.frame, {events: {
        onStateChange(event) {
          if (!stillCurrent(event)) return;
          if (event.data === 1) session.hasPlayed = true;
          if ([0, 1, 2].includes(event.data)) capture(session);
        },
        onError(event) {
          if (stillCurrent(event)) session.root.querySelector("[data-mark-label]").textContent =
            "YouTube chưa phát được video trong khung này. Mở liên kết bên dưới và lưu mốc xem thủ công.";
        }
      }});
    } catch { /* Native embed and manual bookmark still work. */ }
  }

  function requestAPI() {
    if (window.YT?.Player) { connect(); return; }
    if (apiRequested) return;
    apiRequested = true;
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      try { if (typeof previousReady === "function") previousReady(); } finally { connect(); }
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => { apiRequested = false; script.remove(); };
    document.head.appendChild(script);
  }

  function manual(event) {
    event.preventDefault();
    const session = active;
    if (!session || !session.root.contains(event.target)) return;
    const form = event.target;
    const id = readId(form.elements.video.value.trim());
    const time = /^(\d+):([0-5]\d)$/.exec(form.elements.position.value.trim());
    const seconds = time && Number(time[1]) * 60 + Number(time[2]);
    if (id !== schedule[session.n-1].video || seconds < schedule[session.n-1].start || seconds >= (schedule[session.n-1].end || Infinity) || !Number.isSafeInteger(seconds)) {
      form.querySelector("[data-manual-status]").textContent = "Nhập đúng liên kết video của buổi này và thời điểm theo dạng phút:giây.";
      return;
    }
    const n = session.n, root = session.root;
    const box = document.createElement("div");
    unmount();
    record(session, id, seconds);
    box.innerHTML = panel(n);
    root.replaceWith(box.firstElementChild);
    mount();
    active.root.querySelector("details").open = true;
    active.root.querySelector("[data-manual-status]").textContent = "Đã lưu mốc " + formatTime(seconds) + " cho Ngày " + n + ".";
    active.root.querySelector("summary").focus();
  }

  function mount() {
    const root = document.querySelector("[data-course-video]");
    if (active && active.root === root) return;
    unmount();
    if (!root) return;
    const session = {root, n: Number(root.dataset.courseVideo), frame: root.querySelector("iframe"), hasPlayed: false, player: null};
    active = session;
    root.querySelector("form").addEventListener("submit", manual);
    session.interval = setInterval(() => capture(session), 5000);
    requestAPI();
  }

  function unmount() {
    if (!active) return;
    const session = active;
    capture(session);
    active = null;
    clearInterval(session.interval);
    session.root.querySelector("form").removeEventListener("submit", manual);
    try { session.player?.destroy(); } catch { /* The frame may have been replaced by navigation. */ }
  }

  window.addEventListener("pagehide", () => capture(active));
  document.addEventListener("visibilitychange", () => { if (document.hidden) capture(active); });
  return {panel, mount, unmount};
};
