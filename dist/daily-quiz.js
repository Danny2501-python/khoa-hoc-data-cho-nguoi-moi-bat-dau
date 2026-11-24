window.makeDailyQuiz = function makeDailyQuiz({esc,save,rec,updateUI}){
 const cache=new Map();
 function all(n){
  if(!cache.has(n)){
   const d=PROGRAM.days[n-1];
   const raw=n>100?trackQuestions(n):n===1?DayOne.questions:n<=30?excelQuestions(d):n<=60?sqlQuestions(d):biQuestions(d.quizTheme ? {...d,n:d.quizTheme} : d);
   cache.set(n,raw.map(([stem,answer,b,c,why],i)=>{
    // Stable ordering across reloads and browsers.
    const order=[[0,1,2],[1,2,0],[2,0,1],[0,2,1],[1,0,2],[2,1,0]][(i*17+n+Math.floor(i/3))%6];
    return {stem,answer,choices:order.map(k=>[answer,b,c][k]),correct:order.indexOf(0),why};
   }));
  }return cache.get(n);
 }
 const items=(n,kind)=>kind==="review"?all(n).slice(0,10):all(n).slice(10);
 function record(n,kind){const day=rec(n);day.quizzes??={};return day.quizzes[kind]??={answers:{},page:0};}
 function panel(n,kind){
  const qs=items(n,kind),state=record(n,kind),start=state.page*5,end=Math.min(start+5,qs.length),graded=Number.isInteger(state.score);
  const questions=qs.slice(start,end).map((q,i)=>{const j=i+start,selected=state.answers[j];
   return `<fieldset class="mcq"><legend><span>${j+1}.</span> ${esc(q.stem)}</legend>${q.choices.map((a,k)=>`<label class="mcq-option${graded&&k===q.correct?' correct':''}${graded&&selected===k&&selected!==q.correct?' incorrect':''}"><input type="radio" name="${kind}-${j}" data-answer="${j}" value="${k}" ${selected===k?"checked":""} ${graded?"disabled":""}><span>${esc(a)}</span></label>`).join("")}${graded?`<p class="solution"><b>${selected===q.correct?"Đúng.":"Chưa đúng."}</b> Đáp án: ${esc(q.answer)}. ${esc(q.why)}</p>`:""}</fieldset>`;
  }).join("");
  const count=Object.keys(state.answers).length;
  return `<section class="quizpanel" data-quiz="${kind}" data-day="${n}" aria-label="${kind==="review"?"Ôn nhanh":"Kiểm tra cuối buổi"}"><div class="quizhead"><h3>${kind==="review"?"Ôn nhanh · 10 câu":"Đề kiểm tra · 30 câu"}</h3><b class="quizcount" aria-live="polite">${graded?`Điểm ${state.score}/${qs.length}`:`Đã chọn ${count}/${qs.length}`}</b></div><div class="quizbody">${questions}</div><div class="actions"><button type="button" class="btn ghost" data-turn="-1" ${start===0?"disabled":""}>5 câu trước</button><span class="small">Câu ${start+1}–${end} / ${qs.length}</span><button type="button" class="btn ghost" data-turn="1" ${end===qs.length?"disabled":""}>5 câu tiếp</button></div><div class="actions"><button type="button" class="btn ${graded?"ghost":"green"}" ${graded?"data-retry":"data-grade"}>${graded?"Làm lại":kind==="review"?"Chấm ôn nhanh":"Nộp bài và xem điểm"}</button></div><p class="small quizmsg" role="status">${graded?"Xem đáp án và giải thích dưới từng câu.":""}</p></section>`;
 }
 document.addEventListener("change",e=>{const input=e.target;if(!input.matches("[data-answer]"))return;const box=input.closest("[data-quiz]"),kind=box.dataset.quiz,n=+box.dataset.day,s=record(n,kind);if(s.score!=null)return;s.answers[input.dataset.answer]=+input.value;box.querySelector(".quizcount").textContent=`Đã chọn ${Object.keys(s.answers).length}/${items(n,kind).length}`;save();});
 document.addEventListener("click",e=>{const btn=e.target.closest("button[data-turn],button[data-grade],button[data-retry]");if(!btn)return;const box=btn.closest("[data-quiz]");if(!box)return;const n=+box.dataset.day,kind=box.dataset.quiz,qs=items(n,kind),s=record(n,kind);let msg="",dest="";
 if(btn.hasAttribute("data-grade")){const first=qs.findIndex((_,i)=>s.answers[i]==null);
  if(first>=0){s.page=Math.floor(first/5);msg=`Còn ${qs.length-Object.keys(s.answers).length} câu chưa chọn. Hãy tiếp tục từ câu ${first+1}.`;dest=`[data-answer="${first}"]`;}
  else{s.score=qs.reduce((sum,q,i)=>sum+(s.answers[i]===q.correct?1:0),0);s.page=0;if(kind==="exam")rec(n).examComplete=true;}
 }else if(btn.hasAttribute("data-retry")){s.answers={};s.page=0;delete s.score;if(kind==="exam"&&!rec(n).done)rec(n).examComplete=false;}
 else s.page=Math.max(0,Math.min(Math.ceil(qs.length/5)-1,s.page+Number(btn.dataset.turn)));
 save();box.outerHTML=panel(n,kind);updateUI(n);
 const fresh=document.querySelector(`[data-quiz="${kind}"]`);if(msg)fresh.querySelector(".quizmsg").textContent=msg;
 const focus=fresh.querySelector(dest||".quizhead");focus.tabIndex=-1;focus.focus();
 });
 return {panel,items};
};

