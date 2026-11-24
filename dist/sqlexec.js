/* SQLite runs on a fresh copy of the practice tables in a time-limited worker. */
const StudySQL = (() => {
  let job, timer, workerURL;
  function stop(){
    job?.terminate();
    job=null;
    clearTimeout(timer);
    if(workerURL)URL.revokeObjectURL(workerURL);
    workerURL=null;
  }
  function work(){
    self.onmessage=async event=>{
      try{
        importScripts(event.data.engine);
        const SQL=await initSqlJs();
        let bytes;
        if(event.data.databaseURL){
          const response=await fetch(event.data.databaseURL);
          if(!response.ok)throw Error("Không tải được cơ sở dữ liệu thực hành.");
          bytes=new Uint8Array(await response.arrayBuffer());
        }
        const db=new SQL.Database(bytes);
        for(const [name,t] of Object.entries(event.data.tables)){
          db.run("CREATE TABLE "+name+" ("+t.cols.map((c,i)=>c+" "+t.types[i]).join(",")+")");
          const ins=db.prepare("INSERT INTO "+name+" VALUES ("+t.cols.map(()=>"?").join(",")+")");
          for(const row of t.rows)ins.run(row);
          ins.free();
        }
        db.run("PRAGMA query_only = ON");
        const result=db.exec(event.data.query);
        const r=result.at(-1);
        self.postMessage({columns:r?.columns||[],rows:r?.values.slice(0,100)||[],count:r?.values.length||0});
        db.close();
      }catch(e){ self.postMessage({error:e.message}); }
    };
  }
  function run(query,tables,callback,databaseURL){
    stop();query=query.trim();
    if(!/^(SELECT|WITH)\b/i.test(query) || /;\s*\S/.test(query)) {callback({error:"Hãy chạy từng truy vấn SELECT hoặc WITH, mỗi lần một câu."});return;}
    workerURL=URL.createObjectURL(new Blob(["("+work.toString()+")()"],{type:"text/javascript"}));
    try{
      job=new Worker(workerURL);
      job.onmessage=ev=>{stop();callback(ev.data);};
      job.onerror=()=>{stop();callback({error:"Trình duyệt chưa tải được SQLite. Hãy chạy lại bằng trình duyệt có hỗ trợ Web Worker."});};
      const script=window.OFFLINE_ENGINE || new URL("vendor/sql-asm.js",document.baseURI).href;
      job.postMessage({query,tables,engine:script,databaseURL});
      timer=setTimeout(()=>{stop();callback({error:"Truy vấn mất hơn 12 giây. Hãy thu hẹp điều kiện và thử lại."});},12000);
    }catch{stop();callback({error:"Trình duyệt chưa cho phép mở bộ chạy SQLite."});}
  }
  return {run,stop};
})();
