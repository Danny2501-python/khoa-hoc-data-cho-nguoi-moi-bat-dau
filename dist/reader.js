/* Books chosen here are read locally, within this browser. */
const Reader = (() => {
  const cache = new Map(), stored = new Map();
  let database;
  function db() {
    if (!database) database = new Promise((ok, fail) => {
      if (!window.indexedDB) return fail(Error("IndexedDB"));
      const req = indexedDB.open("datalab-study-books", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("books");
      req.onsuccess = () => ok(req.result);
      req.onerror = () => fail(req.error);
    });
    return database;
  }
  async function access(mode, fn) {
    const connection = await db();
    return new Promise((ok, fail) => {
      const tx = connection.transaction("books", mode);
      const req = fn(tx.objectStore("books"));
      tx.oncomplete = () => ok(req.result);
      tx.onerror = tx.onabort = () => fail(tx.error);
    });
  }
  async function load(id) {
    if (cache.has(id)) return cache.get(id);
    let blob;
    try { blob = await access("readonly", s => s.get(id)); } catch {}
    if (blob && !cache.has(id)) cache.set(id, URL.createObjectURL(blob));
    return cache.get(id);
  }
  async function attach(id, file) {
    if (!file || !file.size || (await file.slice(0,5).text()) !== "%PDF-") throw Error("Hãy chọn đúng một tệp PDF.");
    const blob = file.slice(0,file.size,"application/pdf");
    if(cache.has(id)) URL.revokeObjectURL(cache.get(id));
    cache.set(id,URL.createObjectURL(blob));
    try { await access("readwrite", s => s.put(blob,id)); stored.set(id,true); }
    catch { stored.set(id,false); }
    return stored.get(id);
  }
  const privateBooks = new Map();
  const validFile = value => /^libfile_[a-f0-9]{32}$/.test(value || "");
  function remember(book, file){
    if(!validFile(file))return;
    privateBooks.set(book,file);
    try { localStorage.setItem("datalab-private-book-"+book,file); } catch {}
  }
  function privateURL(book){
    let file=privateBooks.get(book);
    if(!file){try { file=localStorage.getItem("datalab-private-book-"+book); } catch {}}
    return validFile(file)?"https://chatgpt.com/library?file_id="+file+"&account_id=personal":null;
  }
  const publicURL = id => window.PUBLIC_BOOKS?.[id];
  async function hydrate(root) {
    await Promise.all([...root.querySelectorAll("[data-readbook]")].map(async node => {
      const id=node.dataset.readbook, pg=Number(node.dataset.p)||1;
      const url=await load(id) || publicURL(id);
      const personal=privateURL(id);
      if((!url && !personal) || !node.isConnected) return;
      node.hidden=false;
      node.href = url ? url+"#page="+pg : personal;
      node.target="_blank";node.rel="noopener";
      node.textContent=url ? "Đọc PDF · trang "+pg : "Mở sách trong ChatGPT";
      node.className="btn ghost";
    }));
  }
  return {attach,hydrate,remember};
})();

